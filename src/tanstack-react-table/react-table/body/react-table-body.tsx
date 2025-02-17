import { Table } from '@tanstack/react-table';
import { StyledBodyWrapper, StyledBodyItemWrapper } from './body-style';
import { INestedTableProps } from '../types';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DragAlongCell } from './table-cell';
import { IItemInfo } from '../../store';


export const ReactTableBody = ({ table, columnOrder, renderNestedTable }: { columnOrder: string[], table: Table<IItemInfo> } & INestedTableProps) => {

    return (<StyledBodyWrapper>
        {table.getRowModel().rows.map(row => (
            <>
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
                {row.getIsSelected() && renderNestedTable?.(row.original)}
            </>
        ))}
    </StyledBodyWrapper>);
}
