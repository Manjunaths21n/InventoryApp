import { ColumnKeyMapper } from "./constant-mappers";

export interface IItemInfo {
    [ColumnKeyMapper.ITEM_ID]: string;
    [ColumnKeyMapper.ITEM_NAME]: string;
    [ColumnKeyMapper.ITEMS_QUANTITY]: number;
    [ColumnKeyMapper.COST_PER_ITEM]: number;
    [ColumnKeyMapper.TOTAL_ITEMS_COST]: number;
    [ColumnKeyMapper.DISCOUNT]: number;
}

export type IStoreItemsInfo = Record<string, IItemInfo>;

export interface IStoreInfo {
    storeLoneAmount: number;
    storeIncomingAmount: number;
}


export interface IStoreBillInfo {
    items: IStoreItemsInfo;
    [ColumnKeyMapper.DATE]: string;
    [ColumnKeyMapper.BILL_ID]: string;
    [ColumnKeyMapper.DISCOUNT]?: number;
    [ColumnKeyMapper.TOTAL_ITEMS_QUANTITY]: number;
    [ColumnKeyMapper.TOTAL_BILL_COST]: number;
    [ColumnKeyMapper.PAID_AMOUNT]?: number;
    [ColumnKeyMapper.BALANCE_AMOUNT]?: number;
    [ColumnKeyMapper.STATUS]: 'paid' | 'partial' | 'pending';
}

export type IStoreSalesInfo = Record<string, IStoreBillInfo>

export type IStoreOrdersInfo = Record<string, IStoreBillInfo>

export interface IInitialState {
    storeInfo: IStoreInfo,
    storeItems: IStoreItemsInfo;
    storeSales: IStoreSalesInfo;
    storeOrders: IStoreOrdersInfo;
}
