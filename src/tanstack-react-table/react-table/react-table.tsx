import { memo, useCallback, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, CellContext, getFilteredRowModel, getSortedRowModel, Row, SortingState, getGroupedRowModel, getExpandedRowModel, ColumnDef } from '@tanstack/react-table';
import { ReactTableBody } from './body';
import { ReactTableFooter } from './footer';
import { StyledActionButtons, StyledTableWrapper, StyledTextBox } from './style';
import { ReactTableHeader } from './header';
import { IStoreColumn, Person, TableMeta } from './types';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove } from '@dnd-kit/sortable'
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    type DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { IReactTableContext, ReatTableContext } from './context';

export const TableActionButtons = (props: CellContext<Person, unknown> & { onSave(): void, onCancel(): void, onEdit(index: number): void }) => {
    const { row: { index }, table: { options: { meta } }, onCancel, onEdit, onSave } = props;

    const allowEdit = (meta as TableMeta)?.editIndex === index;
    const _onSave = () => {
        onSave();

    };
    const _onCancel = () => {
        onCancel();
    }
    const _onEdit = () => {
        onEdit(index);
    }


    return (<>{
        allowEdit ?

            <div>
                <StyledActionButtons onClick={_onSave}>save</StyledActionButtons>
                <StyledActionButtons onClick={_onCancel}>cancel</StyledActionButtons>
            </div> :
            <StyledActionButtons onClick={_onEdit}>edit</StyledActionButtons>
    }</>)

}


export const PersonTableCellRender = (props: CellContext<Person, unknown> & { onChange(): void }) => {
    const { row: { index }, cell: { getValue, }, table: { options: { meta } } } = props;

    const [value, setValue] = useState<any>(getValue());
    const allowEdit = (meta as TableMeta)?.editIndex === index;

    const _onChange = (arg: any) => {
        console.log(arg)
        setValue(arg.target?.value ?? '');
    };


    return (<>{
        allowEdit ?

            <StyledTextBox type={'text'} onChange={_onChange} defaultValue={value} />
            :
            <span>{value}</span>
    }</>)

}

export const StoreTableCellRender = (props: CellContext<IStoreColumn, unknown> & { onChange(): void }) => {
    const { row: { index }, cell: { getValue, }, table: { options: { meta } }, column: { id: columnId } } = props;

    const [value, setValue] = useState<any>(getValue());
    const allowEdit = (meta as TableMeta)?.editIndex === index;

    const _onChange = (arg: any) => {
        console.log(arg)
        setValue(arg.target?.value ?? '');
    };
    console.log(columnId);

    return (<>{
        allowEdit ?
            <StyledTextBox disabled={columnId === 'totalCost'} type={'text'} onChange={_onChange} defaultValue={value} />
            :
            <span>{value}</span>
    }</>)

}



// const defaultDevVMData: IStoreColumn[] = MockData;
// const defaultStoreData: IStoreColumn[] = [];

export interface IColumnsInfo {
    columnName: string;
    columnDisplayName: string;
    enableSorting: boolean;
    sortDescFirst: boolean;
    enableMultiSort: boolean;
}

export const filterFn = (row: Row<Person>, columnId: string, filterValue: Record<string, string>) => {
    if (!filterValue) return true; // No filter applied

    const rowValue = row.getValue<string>(columnId).toLowerCase();
    const { value1, value2, operator } = filterValue;
    console.log(rowValue);
    if (operator === 'AND') {
        return rowValue.includes(value1) && rowValue.includes(value2);
    } else {
        return rowValue.includes(value1) || rowValue.includes(value2);
    }
}

export const storeFilterFn = (row: Row<IStoreColumn>, columnId: string, filterValue: Record<string, string>) => {
    if (!filterValue) return true; // No filter applied

    const rowValue = row.getValue<string>(columnId).toLowerCase();
    const { value1, value2, operator } = filterValue;
    console.log(rowValue);
    if (operator === 'AND') {
        return rowValue.includes(value1) && rowValue.includes(value2);
    } else {
        return rowValue.includes(value1) || rowValue.includes(value2);
    }
}

export const ReactTable = memo((props: { data: any[], columnsInfo: ColumnDef<any, any>[], editRowIndex?: number }) => {
    const { columnsInfo, data, editRowIndex } = props;
    const [sorting, setSorting] = useState<SortingState>([])

    const [columnOrder, setColumnOrder] = useState<string[]>(columnsInfo?.map(c => c.id ?? '') ?? []);

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e
        if (active && over && active.id !== over.id) {
            setColumnOrder(columnOrder => {
                const oldIndex = columnOrder.indexOf(active.id as string)
                const newIndex = columnOrder.indexOf(over.id as string)
                return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
            })
        }
    };

    const table = useReactTable({
        defaultColumn: {
            size: 200, // Default starting column size
            minSize: 50, // Minimum size enforced during column resizing
            maxSize: 500, // Maximum size enforced during column resizing
        },
        columns: columnsInfo,
        data,
        getCoreRowModel: getCoreRowModel(),
        enableGrouping: true,
        getPaginationRowModel: getPaginationRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        meta: {
            editIndex: editRowIndex
        },
        state: {
            sorting
        },
    });

    const onColumnGroup = useCallback(() => {
        setColumnOrder(preState => {
            const groupedColumns = table.getState().grouping;
            const unGroupedColumns = preState.filter((perStateColumn) => (!groupedColumns.includes(perStateColumn)));
            return [...groupedColumns, ...unGroupedColumns];
        });
    }, [table]);

    console.log(table.getState());
    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    const reactTableContextValue: IReactTableContext = useMemo(() => ({ onColumnGroup }), [onColumnGroup]);



    return (

        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <StyledTableWrapper className="p-2">
                <ReatTableContext.Provider value={reactTableContextValue} >
                    <ReactTableHeader table={table} columnOrder={columnOrder} />
                    <ReactTableBody table={table} columnOrder={columnOrder} />
                    <ReactTableFooter table={table} />
                </ReatTableContext.Provider>
            </StyledTableWrapper>
        </DndContext>);
});

