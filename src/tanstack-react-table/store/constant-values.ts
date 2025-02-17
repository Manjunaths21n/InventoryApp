import { ColumnKeyMapper, columnNameMapper } from "./constant-mappers";
import { IInitialState, IItemInfo, IStoreBillInfo } from "./type";
import { getShortId } from "./utilites";

export interface IColumnNamesInfo {
    columnName: ColumnKeyMapper;
    columnDisplayName: string;
    showColumn: boolean;
}

export const storeItemsColumnInfo: IColumnNamesInfo[] = [
    { columnName: ColumnKeyMapper.ITEM_ID, columnDisplayName: columnNameMapper[ColumnKeyMapper.ITEM_ID], showColumn: false },
    { columnName: ColumnKeyMapper.ITEM_NAME, columnDisplayName: columnNameMapper[ColumnKeyMapper.ITEM_NAME], showColumn: true },
    { columnName: ColumnKeyMapper.ITEMS_QUANTITY, columnDisplayName: columnNameMapper[ColumnKeyMapper.ITEMS_QUANTITY], showColumn: true },
    { columnName: ColumnKeyMapper.COST_PER_ITEM, columnDisplayName: columnNameMapper[ColumnKeyMapper.COST_PER_ITEM], showColumn: true },
    { columnName: ColumnKeyMapper.DISCOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.DISCOUNT], showColumn: true },
    { columnName: ColumnKeyMapper.TOTAL_ITEMS_COST, columnDisplayName: columnNameMapper[ColumnKeyMapper.TOTAL_ITEMS_COST], showColumn: true },
];

export const storeSalesColumnInfo: IColumnNamesInfo[] = [
    { columnName: ColumnKeyMapper.DATE, columnDisplayName: columnNameMapper[ColumnKeyMapper.DATE], showColumn: true },
    { columnName: ColumnKeyMapper.BILL_ID, columnDisplayName: columnNameMapper[ColumnKeyMapper.BILL_ID], showColumn: false },
    { columnName: ColumnKeyMapper.DISCOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.DISCOUNT], showColumn: false },
    { columnName: ColumnKeyMapper.TOTAL_ITEMS_QUANTITY, columnDisplayName: columnNameMapper[ColumnKeyMapper.TOTAL_ITEMS_QUANTITY], showColumn: true },
    { columnName: ColumnKeyMapper.PAID_AMOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.PAID_AMOUNT], showColumn: false },
    { columnName: ColumnKeyMapper.BALANCE_AMOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.BALANCE_AMOUNT], showColumn: false },
    { columnName: ColumnKeyMapper.TOTAL_BILL_COST, columnDisplayName: columnNameMapper[ColumnKeyMapper.TOTAL_BILL_COST], showColumn: true },
    { columnName: ColumnKeyMapper.STATUS, columnDisplayName: columnNameMapper[ColumnKeyMapper.STATUS], showColumn: true },
]

export const storeBuyColumnInfo: IColumnNamesInfo[] = [
    { columnName: ColumnKeyMapper.DATE, columnDisplayName: columnNameMapper[ColumnKeyMapper.DATE], showColumn: true },
    { columnName: ColumnKeyMapper.BILL_ID, columnDisplayName: columnNameMapper[ColumnKeyMapper.BILL_ID], showColumn: false },
    { columnName: ColumnKeyMapper.DISCOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.DISCOUNT], showColumn: false },
    { columnName: ColumnKeyMapper.TOTAL_ITEMS_QUANTITY, columnDisplayName: columnNameMapper[ColumnKeyMapper.TOTAL_ITEMS_QUANTITY], showColumn: true },
    { columnName: ColumnKeyMapper.PAID_AMOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.PAID_AMOUNT], showColumn: false },
    { columnName: ColumnKeyMapper.BALANCE_AMOUNT, columnDisplayName: columnNameMapper[ColumnKeyMapper.BALANCE_AMOUNT], showColumn: false },
    { columnName: ColumnKeyMapper.TOTAL_BILL_COST, columnDisplayName: columnNameMapper[ColumnKeyMapper.TOTAL_BILL_COST], showColumn: true },
    { columnName: ColumnKeyMapper.STATUS, columnDisplayName: columnNameMapper[ColumnKeyMapper.STATUS], showColumn: false },
]

export const storeItemsData: IItemInfo[] = [
    {
        itemId: 'I001',
        itemName: 'abc',
        itemsQuantity: 2,
        costPerItem: 25,
        totalItemsCost: 50,
        discount: 0
    }
];

export const storeSalesData: IStoreBillInfo[] = [
    {
        items: {
            I0001: {
                itemId: 'I001',
                itemName: 'abc',
                itemsQuantity: 1,
                costPerItem: 25,
                totalItemsCost: 25,
                discount: 0
            }
        },
        totalBillCost: 25,
        totalItemsQuantity: 1,
        date: '23-2-2025',
        billId: 'B001',
        discount: 0,
        PaidAmount: 0,
        balanceAmount: 0,
        status: 'paid',
    }
]

export const getDummyStoreSalesData = (): IStoreBillInfo => {
    const itemId = getShortId();
    return (
        {
            items: {
                [itemId]: {
                    itemId,
                    itemName: 'abc',
                    itemsQuantity: 1,
                    costPerItem: 25,
                    totalItemsCost: 25,
                    discount: 0
                }
            },
            totalBillCost: 25,
            totalItemsQuantity: 1,
            date: '23-2-2025',
            billId: getShortId(),
            discount: 0,
            PaidAmount: 0,
            balanceAmount: 0,
            status: 'paid',
        }
    )
}

export const appInitialState: IInitialState = {
    storeInfo: { storeIncomingAmount: 0, storeLoneAmount: 0 },
    storeItems: { [storeItemsData[0].itemId]: storeItemsData[0] },
    storeOrders: { [storeSalesData[0].billId]: storeSalesData[0] },
    storeSales: { [storeSalesData[0].billId]: storeSalesData[0] }
};