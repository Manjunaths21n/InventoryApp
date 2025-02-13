import { CellContext, ColumnDef } from "@tanstack/react-table"
import { IStoreColumn, IStoreOrdersColumn, IStoreSalesColumn, Person } from "./types"
import { TableActionButtons, PersonTableCellRender, filterFn } from "./react-table"
import { storeBuyColumnInfo, storeItemsColumnInfo, storeSalesColumnInfo } from "../store/constants";

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
            cell: (args) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'CreatedDate', accessorKey: 'CreatedDate', id: 'CreatedDate', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'ModifiedBy', accessorKey: 'ModifiedBy', id: 'ModifiedBy', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'ModifiedDate', accessorKey: 'ModifiedDate', id: 'ModifiedDate', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        },
        {
            header: 'rowNum', accessorKey: 'rowNum', id: 'rowNum', size: 200, enableSorting: true, sortDescFirst: false, enableMultiSort: true,
            cell: (args) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
            enableColumnFilter: true,
            filterFn,
            meta:
            {
                filterVariant: 'range',
            }
        }
    ]);
}

// export const preparecolumns=(args:{ columns:{columnDisplayName:string, columnName:string}[] ,cellProps?:any, enableFilter?:boolean, enableGrouping?:boolean, enableSorting?:boolean})=>{
//     const {columns,cellProps, }=args;

//     return columns.map(({columnDisplayName,columnName})=>({
//         header: columnDisplayName, accessorKey: columnName, id: columnName, size: 150,
//         cell: (args: CellContext<any, any>) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
//         enableColumnFilter: false,
//         enableSorting: false, enableMultiSort: false,
//     }));

// }

export const getStorColumns = (args: { onSave(): void, onCancel(): void, onEdit(index: number): void }): ColumnDef<IStoreColumn, any>[] => {
    const { onCancel, onEdit, onSave } = args;
    return ([
        {
            header: 'Actions', accessorKey: 'Actions', id: 'Actions', size: 150,
            cell: (args: any) => <TableActionButtons {...{ ...args, onSave, onEdit, onCancel }} />,
            enableColumnFilter: false,
            enableSorting: false, enableMultiSort: false,
        },
        ...storeItemsColumnInfo.map(({ columnDisplayName, columnName }) => ({
            header: columnDisplayName, accessorKey: columnName, id: columnName, size: 150,
            cell: (args: CellContext<any, any>) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
            enableColumnFilter: false,
            enableSorting: false, enableMultiSort: false,
        }))
    ]);
}


export const getStorSalesColumns = (args: { onSave(): void, onCancel(): void, onEdit(index: number): void }): ColumnDef<IStoreSalesColumn, any>[] => {
    const { onCancel, onEdit, onSave } = args;
    const columnInfo = storeSalesColumnInfo.map(({ columnDisplayName, columnName }) => ({
        header: columnDisplayName, accessorKey: columnName, id: columnName, size: 150,
        cell: (args: CellContext<any, any>) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
        enableColumnFilter: false,
        enableSorting: false, enableMultiSort: false,
    }));
    return ([
        {
            header: 'Actions', accessorKey: 'Actions', id: 'Actions', size: 150,
            cell: (args: any) => <TableActionButtons {...{ ...args, onSave, onEdit, onCancel }} />,
            enableColumnFilter: false,
            enableSorting: false, enableMultiSort: false,
        },
        ...columnInfo
    ]);
}


export const getStorOrderColumns = (args: { onSave(): void, onCancel(): void, onEdit(index: number): void }): ColumnDef<IStoreOrdersColumn, any>[] => {
    const { onCancel, onEdit, onSave } = args;
    const columnInfo = storeBuyColumnInfo.map(({ columnDisplayName, columnName }) => ({
        header: columnDisplayName, accessorKey: columnName, id: columnName, size: 150,
        cell: (args: CellContext<any, any>) => { return (<PersonTableCellRender {...args} onChange={() => { console.log('d') }} />) },
        enableColumnFilter: false,
        enableSorting: false, enableMultiSort: false,
    }));
    return ([
        {
            header: 'Actions', accessorKey: 'Actions', id: 'Actions', size: 150,
            cell: (args: any) => <TableActionButtons {...{ ...args, onSave, onEdit, onCancel }} />,
            enableColumnFilter: false,
            enableSorting: false, enableMultiSort: false,
        },
        ...columnInfo
    ]);
}

