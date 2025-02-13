
export interface IItemInfo {
    itemId: string;
    itemName: string;
    quantity: number;
    costPerItem: number;
    totalCost: number;
    discount?: number;
}

export interface IStoreItemsInfo {
    items: Record<string, IItemInfo>;
    storeLoneAmount?: number;
    storeIncomingAmount?: number;
}

export interface IStoreBillInfo {
    date: string;
    billId: string;
    discount?: number;
    totalCost: number;
    advanceAmount?: number;
    balanceAmount?: number;
    status: 'paid' | 'partial' | 'pending';
}

export interface IStoreSalesInfo extends IStoreItemsInfo, IStoreBillInfo {
}

export type IStoreOrdersInfo = IStoreSalesInfo

export interface IInitialState {
    storeItems: IStoreItemsInfo;
    storeSales: Record<string, IStoreSalesInfo>;
    storeOrders: Record<string, IStoreOrdersInfo>;
}


export const appInitialState: IInitialState = {
    storeItems: { items: {}, storeIncomingAmount: 0, storeLoneAmount: 0 },
    storeOrders: {},
    storeSales: {}
};

export const storeItemsColumnInfo = [
    { columnName: 'itemId', columnDisplayName: 'Item Id' },
    { columnName: 'itemName', columnDisplayName: 'Item Name' },
    { columnName: 'quantity', columnDisplayName: 'Quantity' },
    { columnName: 'costPerItem', columnDisplayName: 'Cost Per Item' },
    { columnName: 'totalCost', columnDisplayName: 'Total Cost' }
];

export const storeItemsData = [
    {
        itemId: 'I001',
        itemName: 'abc',
        quantity: '2',
        costPerItem: '25',
        totalCost: '50'
    }
];

export const storeSalesData = [
    {
        itemId: 'I001',
        itemName: 'abc',
        quantity: '1',
        costPerItem: '25',
        totalCost: '25',
        date: '23-2-2025',
        billId: 'B001',
        discount: '0',
        advanceAmount: '0',
        balanceAmount: '0',
        status: 'done',
    }
]

export const storeSalesColumnInfo = [
    ...storeItemsColumnInfo,
    { columnName: 'date', columnDisplayName: 'Date' },
    { columnName: 'billId', columnDisplayName: 'Bill Id' },
    { columnName: 'discount', columnDisplayName: 'Discount' },
    { columnName: 'totalCost', columnDisplayName: 'Total Cost' },
    { columnName: 'advanceAmount', columnDisplayName: 'Advance Amount' },
    { columnName: 'balanceAmount', columnDisplayName: 'Balance Amount' },
    { columnName: 'status', columnDisplayName: 'Status' },
]

export const storeBuyColumnInfo = [...storeSalesColumnInfo];

export function getShortId(length = 8): string {
    return crypto.randomUUID().replace(/-/g, '').substring(0, length);
}