import { Table, flexRender } from '@tanstack/react-table';
import { IItemInfo } from '../types';

export const ReactTableFooter = ({ table }: { table: Table<IItemInfo> }) => {

    return (<div>
        {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                    <th key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext()
                            )}
                    </th>
                ))}
            </tr>
        ))}
        <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
        >
            {'<<'}
        </button>
        <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            {'<'}
        </button>
        <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            {'>'}
        </button>
        <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
        >
            {'>>'}
        </button>
        <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
                table.setPageSize(Number(e.target.value))
            }}
        >
            {[1, 2, 3, 10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    {pageSize}
                </option>
            ))}
        </select>
    </div>);
}