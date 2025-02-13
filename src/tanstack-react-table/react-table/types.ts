import { IStoreBillInfo } from "../store/constants";

export type IStoreColumn = {
    itemId: string;
    itemName: string;
    quantity: number;
    costPerItem: number;
    totalCost: number;
}

export type IStoreSalesColumn = IStoreBillInfo & IStoreColumn;
export type IStoreOrdersColumn = IStoreBillInfo & IStoreColumn;

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

