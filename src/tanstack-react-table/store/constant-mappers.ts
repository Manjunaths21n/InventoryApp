

export enum ColumnKeyMapper {
    ITEM_ID = 'itemId',
    ITEM_NAME = 'itemName',
    ITEMS_QUANTITY = 'itemsQuantity',
    ITEMS = 'items',
    TOTAL_ITEMS_QUANTITY = 'totalItemsQuantity',
    COST_PER_ITEM = 'costPerItem',
    TOTAL_ITEMS_COST = 'totalItemsCost',
    TOTAL_BILL_COST = 'totalBillCost',
    DATE = 'date',
    BILL_ID = 'billId',
    DISCOUNT = 'discount',
    PAID_AMOUNT = 'PaidAmount',
    BALANCE_AMOUNT = 'balanceAmount',
    STATUS = 'status',
}

export const columnNameMapper = {
    [ColumnKeyMapper.ITEM_ID]: 'Item Id',
    [ColumnKeyMapper.ITEM_NAME]: 'Item Name',
    [ColumnKeyMapper.ITEMS_QUANTITY]: 'Items Quantity',
    [ColumnKeyMapper.ITEMS]: 'items',
    [ColumnKeyMapper.TOTAL_ITEMS_QUANTITY]: 'Total Items Quantity',
    [ColumnKeyMapper.COST_PER_ITEM]: 'Cost Per Item',
    [ColumnKeyMapper.TOTAL_ITEMS_COST]: 'Total Items Cost',
    [ColumnKeyMapper.TOTAL_BILL_COST]: 'Total Bill Cost',
    [ColumnKeyMapper.DATE]: 'Date',
    [ColumnKeyMapper.BILL_ID]: 'Bill Id',
    [ColumnKeyMapper.DISCOUNT]: 'Discount',
    [ColumnKeyMapper.PAID_AMOUNT]: 'Paid Amount',
    [ColumnKeyMapper.BALANCE_AMOUNT]: 'Balance Amount',
    [ColumnKeyMapper.STATUS]: 'Status',
}

export const autoCalculateColumnInSales = [ColumnKeyMapper.TOTAL_BILL_COST, ColumnKeyMapper.TOTAL_ITEMS_COST, ColumnKeyMapper.BALANCE_AMOUNT, ColumnKeyMapper.COST_PER_ITEM]
export const autoCalculateColumnInBuys = [ColumnKeyMapper.TOTAL_BILL_COST, ColumnKeyMapper.TOTAL_ITEMS_COST, ColumnKeyMapper.BALANCE_AMOUNT]
