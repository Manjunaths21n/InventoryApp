import React, { useState } from 'react'


import {
    GroupingState,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
    getSortedRowModel,
    SortingState,
} from '@tanstack/react-table'
import { makeData, Person2 } from './makeData'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { StyledHeaderWrapper, StyledHeaderItemWrapper, StyledHeaderItem } from './header/header-style'
import { DraggableTableHeader, ReactTableHeader } from './header/react-table-header'
import { IStoreColumn } from './types'
import { MockData } from '../store'
import { ReactTableBody, StyledBodyItem, StyledBodyItemWrapper, StyledBodyWrapper } from './body'
import { StyledTableWrapper } from './style'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { ReactTableFooter } from './footer'

export function GroupingIssue() {
    const rerender = React.useReducer(() => ({}), {})[1]

    const columns = React.useMemo<ColumnDef<IStoreColumn>[]>(
        () => [

            {
                accessorKey: 'CreatedBy',
                header: 'CreatedBy',
                // cell: info => info.getValue(),
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                // getGroupingValue: row => `${row.firstName} ${row.lastName}`,
            },
            {
                // accessorFn: row => row.lastName,
                accessorKey: 'CreatedDate',
                id: 'CreatedDate',
                // header: () => <span>Last Name</span>,
                // cell: info => info.getValue(),
            },


            {
                accessorKey: 'ModifiedBy',
                // header: () => 'Age',
                // aggregatedCell: ({ getValue }) =>
                // Math.round(getValue<number>() * 100) / 100,
                // aggregationFn: 'median',
            },

            {
                accessorKey: 'ModifiedDate',
                // header: () => <span>Visits</span>,
                // aggregationFn: 'sum',
                // aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
            },
            {
                accessorKey: 'rowNum',
                header: 'rowNum',
            },


        ],
        []
    )

    const [data, setData] = React.useState(() => makeData(100))
    const refreshData = () => setData(() => makeData(100))

    const [grouping, setGrouping] = React.useState<GroupingState>([])
    const [editIndex, setEditIndex] = useState(-1);
    const [columnOrder, setColumnOrder] = useState<string[]>(columns.map(c => c.id ?? ''));
    const [sorting, setSorting] = useState<SortingState>([])
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
        columns,
        data: MockData,
        getCoreRowModel: getCoreRowModel(),
        enableGrouping: true,
        getPaginationRowModel: getPaginationRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        autoResetPageIndex: false,
        enableColumnFilters: true,
        sortDescFirst: false,
        enableSorting: true,
        enableFilters: true,
        meta: { editIndex } as any,
        state: {
            columnOrder,
            sorting
        },
        onColumnOrderChange: setColumnOrder,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        ><StyledTableWrapper className="p-2">
                <ReactTableHeader table={table} columnOrder={[]} />
                <ReactTableBody table={table} columnOrder={[]} />
                <ReactTableFooter table={table} />
            </StyledTableWrapper>
        </DndContext>);
}
