import { ColumnDef } from "@tanstack/react-table";
import { IStoreBillInfo } from "../store";

export type IStoreSalesColumn = IStoreBillInfo;
export type IStoreOrdersColumn = IStoreBillInfo;

export type Person = {
    CreatedDate: string;
    CreatedBy: string;
    ModifiedDate: string;
    ModifiedBy: string;
    rowNum: string;
}

export type TableMeta = {
    editIndex: number;
};


export interface INestedTableProps {
    renderNestedTable?: (args: any) => React.JSX.Element
}

export interface ITableProps extends INestedTableProps {
    data: any[];
    columnsInfo: ColumnDef<any, any>[];
    editRowIndex?: number;
    height?: string;
}
