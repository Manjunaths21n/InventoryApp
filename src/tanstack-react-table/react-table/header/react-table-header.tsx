import { flexRender, Header, Table } from '@tanstack/react-table';
import { StyledHeaderItem, StyledHeaderItemWrapper, StyledHeaderWrapper } from './header-style';
import { IStoreColumn } from '../types';
import { horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSSProperties, memo, useMemo, useContext } from 'react';
import { TableFilter } from './filter';
import { ReatTableContext } from '../context';

export const DraggableTableHeader = memo(({ header }: { header: Header<IStoreColumn, unknown> }) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } =
        useSortable({
            id: header.column.id,
        });
    const { onColumnGroup } = useContext(ReatTableContext);

    const style: CSSProperties = useMemo(() => ({
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        height: 'auto',
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined, // Fix CSS issue
        transition: 'width transform 0.2s ease-in-out',
        whiteSpace: 'nowrap',
        width: header.column.getSize(),
        zIndex: isDragging ? 1 : 0,
    }), [isDragging, transform, header.column]);

    console.log('header', header.column.getIsSorted());

    return (
        <StyledHeaderItem key={header.id} ref={setNodeRef} style={style}>
            {header.isPlaceholder ? null :
                <>
                    <div style={{ height: '40px' }}>

                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'wrap' }}>

                        <button {...{
                            // onClick: header.column.getToggleSortingHandler(),
                            style: { cursor: 'pointer' }
                        }}
                            onClick={(e) => {
                                e.stopPropagation(); // Ensure it does not interfere with drag events
                                header.column.getToggleSortingHandler()?.(e);
                            }}
                        >
                            {{
                                asc: (
                                    <img
                                        src="https://www.shareicon.net/data/512x512/2015/11/07/668115_arrows_512x512.png"
                                        alt="Ascending Sort"
                                        width={14}
                                        height={14}
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                ),
                                desc: (
                                    <img
                                        src="https://www.shareicon.net/data/512x512/2015/11/07/668115_arrows_512x512.png"
                                        alt="Descending Sort"
                                        width={14}
                                        height={14}
                                        style={{
                                            verticalAlign: 'middle',
                                            transform: 'rotate(180deg)', // Rotating the icon 90 degrees for descending
                                        }}
                                    />
                                ),
                                false: (
                                    <img
                                        src="https://icons.veryicon.com/png/o/internet--web/industrial-icon/sort-2.png"
                                        alt="Sort"
                                        width={14} // Adjust width as needed
                                        height={14} // Adjust height as needed
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                )
                            }[header.column.getIsSorted() as string] ?? null}
                        </button>
                        <button {...attributes} {...listeners} style={{ cursor: 'grab', width: '10px', marginLeft: '5px' }}>
                            ⠿
                        </button>
                        <button
                            onClick={() => { header.column.getToggleGroupingHandler()(); onColumnGroup(); }}
                            {...{
                                style: {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            {header.column.getIsGrouped()
                                ? `🛑(${header.column.getGroupedIndex()}) `
                                : `👊 `}
                        </button>

                        <TableFilter header={header} />
                    </div>
                </>
            }
        </StyledHeaderItem >
    );
});
export const ReactTableHeader = memo(({ table, columnOrder }: { columnOrder: string[], table: Table<IStoreColumn> }) => {
    console.log('header wrapper');

    return (
        <StyledHeaderWrapper>
            {table.getHeaderGroups().map(headerGroup => (
                <StyledHeaderItemWrapper key={headerGroup.id}>
                    <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                    >
                        {headerGroup.headers.map(header => {
                            return (
                                <DraggableTableHeader key={header.id} header={header} />
                            )
                        })}
                    </SortableContext>
                </StyledHeaderItemWrapper>
            ))}
        </StyledHeaderWrapper>);
});
