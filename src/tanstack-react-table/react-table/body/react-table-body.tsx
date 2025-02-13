import { Cell, flexRender, Table } from '@tanstack/react-table';
import { StyledBodyWrapper, StyledBodyItemWrapper, StyledBodyItem } from './body-style';
import { IStoreColumn } from '../types';
import { CSSProperties } from 'react';
import { horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DragAlongCell = ({ cell }: { cell: Cell<IStoreColumn, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    })

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        width: cell.column.getSize(),
        zIndex: isDragging ? 1 : 0,
        background: cell.getIsGrouped()
            ? '#0aff0082'
            : cell.getIsAggregated()
                ? '#ffa50078'
                : cell.getIsPlaceholder()
                    ? '#ff000042'
                    : 'white'
    }

    return (
        <StyledBodyItem style={style} ref={setNodeRef} key={cell.id} >
            {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
            {cell.getIsGrouped() ? (
                // If it's a grouped cell, add an expander and row count
                <>
                    <button
                        {...{
                            onClick: cell.row.getToggleExpandedHandler(),
                            style: {
                                cursor: cell.row.getCanExpand()
                                    ? 'pointer'
                                    : 'normal',
                            },
                        }}
                    >
                        {cell.row.getIsExpanded() ? '👇' : '👉'}{' '}
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}{' '}
                        ({cell.row.subRows.length})
                    </button>
                </>
            ) : cell.getIsAggregated() ? (
                // If the cell is aggregated, use the Aggregated
                // renderer for cell
                flexRender(
                    cell.column.columnDef.aggregatedCell ??
                    cell.column.columnDef.cell,
                    cell.getContext()
                )
            ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                // Otherwise, just render the regular cell
                flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                )
            )}
        </StyledBodyItem>
    )
}


export const ReactTableBody = ({ table, columnOrder }: { columnOrder: string[], table: Table<IStoreColumn> }) => {

    return (<StyledBodyWrapper>
        {table.getRowModel().rows.map(row => (
            <StyledBodyItemWrapper key={row.id} >
                {row.getVisibleCells().map(cell => (
                    <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                    >
                        <DragAlongCell key={cell.id} cell={cell} />
                    </SortableContext>
                ))}
            </StyledBodyItemWrapper>
        ))}
    </StyledBodyWrapper>);
}
