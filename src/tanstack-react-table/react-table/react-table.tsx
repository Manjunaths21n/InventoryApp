import { memo, useCallback, useMemo, useState } from 'react';
import {
    useReactTable, getCoreRowModel, getPaginationRowModel, CellContext, getFilteredRowModel, getSortedRowModel, Row,
    SortingState, getGroupedRowModel, getExpandedRowModel
} from '@tanstack/react-table';
import { ReactTableBody } from './body';
import { ReactTableFooter } from './footer';
import { StyledTableWrapper, StyledTextBox } from './style';
import { ReactTableHeader } from './header';
import { ITableProps, Person, TableMeta } from './types';
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
import { IItemInfo } from '../store';

export const PersonTableCellRender = (props: CellContext<Person, unknown> & { onChange(): void }) => {
    const { row: { index }, cell: { getValue, }, table: { options: { meta } } } = props;

    const [value, setValue] = useState<any>(getValue());
    const allowEdit = (meta as TableMeta)?.editIndex === index;

    const _onChange = (arg: any) => {

        setValue(arg.target?.value ?? '');
    };


    return (<>{
        allowEdit ?

            <StyledTextBox type={'text'} onChange={_onChange} defaultValue={value} />
            :
            <span>{value}</span>
    }</>)

}

export const StoreTableCellRender = (props: CellContext<IItemInfo, unknown> & { onChange(): void }) => {
    const { row: { index }, cell: { getValue, }, table: { options: { meta } }, column: { id: columnId } } = props;

    const [value, setValue] = useState<any>(getValue());
    const allowEdit = (meta as TableMeta)?.editIndex === index;

    const _onChange = (arg: any) => {

        setValue(arg.target?.value ?? '');
    };


    return (<>{
        allowEdit ?
            <StyledTextBox disabled={columnId === 'totalCost'} type={'text'} onChange={_onChange} defaultValue={value} />
            :
            <span>{value}</span>
    }</>)

}



// const defaultDevVMData: IItemInfo[] = MockData;
// const defaultStoreData: IItemInfo[] = [];

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

    if (operator === 'AND') {
        return rowValue.includes(value1) && rowValue.includes(value2);
    } else {
        return rowValue.includes(value1) || rowValue.includes(value2);
    }
}

export const storeFilterFn = (row: Row<IItemInfo>, columnId: string, filterValue: Record<string, string>) => {
    if (!filterValue) return true; // No filter applied

    const rowValue = row.getValue<string>(columnId).toLowerCase();
    const { value1, value2, operator } = filterValue;

    if (operator === 'AND') {
        return rowValue.includes(value1) && rowValue.includes(value2);
    } else {
        return rowValue.includes(value1) || rowValue.includes(value2);
    }
}

export const ReactTable = memo((props: ITableProps) => {
    const { columnsInfo, data, editRowIndex, renderNestedTable, height } = props;
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
            <StyledTableWrapper className="p-2" style={{ height: height ?? '500px' }}>
                <ReatTableContext.Provider value={reactTableContextValue} >
                    <ReactTableHeader table={table} columnOrder={columnOrder} />
                    <ReactTableBody table={table} columnOrder={columnOrder} renderNestedTable={renderNestedTable} />
                    <ReactTableFooter table={table} />
                </ReatTableContext.Provider>
            </StyledTableWrapper>
        </DndContext>);
});

