import { CellContext, ColumnDef } from "@tanstack/react-table"
import { Person } from "./types"
import { PersonTableCellRender, filterFn } from "./react-table"
import { TableActionButtons } from "../action-buttons";

export const getDevVMColumns = (args: { onSave(): void, onCancel(): void, onEdit(index: number): void }): ColumnDef<Person, { editIndex: number, filterVariant: string }>[] => {
    const { onCancel, onEdit, onSave } = args;
    return ([
        {
            header: 'Actions', accessorKey: 'Actions', id: 'Actions', size: 150,
            cell: (args) => <TableActionButtons {...{ ...args, onSave, onEdit, onCancel }} />,
            enableColumnFilter: false,
            enableSorting: false, enableMultiSort: false,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'CreatedBy', accessorKey: 'CreatedBy', id: 'CreatedBy', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => {
                return (<PersonTableCellRender {...args} onChange={() => {
                    //
                }} />)
            },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'CreatedDate', accessorKey: 'CreatedDate', id: 'CreatedDate', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => {
                return (<PersonTableCellRender {...args} onChange={() => {
                    //
                }} />)
            },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'ModifiedBy', accessorKey: 'ModifiedBy', id: 'ModifiedBy', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => {
                return (<PersonTableCellRender {...args} onChange={() => {
                    //
                }} />)
            },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'ModifiedDate', accessorKey: 'ModifiedDate', id: 'ModifiedDate', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => {
                return (<PersonTableCellRender {...args} onChange={() => {
                    //
                }} />)
            },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'rowNum', accessorKey: 'rowNum', id: 'rowNum', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => {
                return (<PersonTableCellRender {...args} onChange={() => {
                    //
                }} />)
            },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        }
    ]);
}

export interface IPrepareColumnsArgs {
    columns: { columnDisplayName: string, columnName: string, cell?: (arg: any) => React.JSX.Element }[];
    enableFilter?: boolean;
    enableGrouping?: boolean;
    enableSorting?: boolean;
}

export const preparecolumns = (args: IPrepareColumnsArgs) => {
    const { columns } = args;

    return columns.map(({ columnDisplayName, columnName, cell }) => ({
        header: columnDisplayName, accessorKey: columnName, id: columnName, size: 150,
        cell: cell ?? ((args: CellContext<any, any>) => {
            return (<PersonTableCellRender {...args} onChange={() => {
                //
            }} />)
        }),
        enableColumnFilter: false,
        enableSorting: false, enableMultiSort: false,
    }));

}


