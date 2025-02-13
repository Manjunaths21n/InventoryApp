export interface IItemInfo {
    itemId: string;
    itemName: string;
    quantity?: number;
    // Quantity is now tracked separately for each purchase/sale
    // costPerItem is removed as it's not constant
}

export interface IStoreItemsInfo {
    items: Record<string, IItemInfo>; // Items keyed by itemId
    // totalCost is removed, calculate it dynamically
}

export interface IStoreTransactionItem { // Items within a transaction
    itemId: string;
    quantity: number;
    costPerItem: number; // Price at the time of purchase/sale
    totalCost: number; // Calculated within the transaction
}

export interface IStoreTransaction {
    transactionId: string;
    date: string;
    items: Array<IStoreTransactionItem>;
    totalCost: number;
    discount?: number;
    advanceAmount?: number;
    balanceAmount?: number;
    status: 'paid' | 'partial' | 'pending';
    type: 'sale' | 'buy'; // Add the 'type' property here!
}

export interface IStoreSalesInfo extends IStoreTransaction {
    type: 'sale';
}

export interface IStoreBuyInfo extends IStoreTransaction {
    type: 'buy';
    supplier?: string;
}

export interface IInitialState {
    storeItems: IStoreItemsInfo;
    storeSales: Record<string, IStoreSalesInfo>;
    storeBuys: Record<string, IStoreBuyInfo>;
}


// Update Inventory (Corrected and Improved - Final Version):
function updateInventory(transaction: IStoreTransaction) {
    transaction.items.forEach(transactionItem => {
        let item = appInitialState.storeItems.items[transactionItem.itemId];

        if (!item) {
            // New item being added to inventory (only happens on buys)
            if (transaction.type === 'buy') {
                item = { // Create a new IItemInfo object
                    itemId: transactionItem.itemId,
                    itemName: transactionItem.itemId, // You'd likely get the name from elsewhere
                    quantity: 0 // Initialize quantity for new items
                };
                appInitialState.storeItems.items[transactionItem.itemId] = item; // Add it to the record
            } else {
                console.error(`Item ${transactionItem.itemId} not found in inventory.`);
                return; // Skip this item
            }
        }

        // Now 'item' is guaranteed to be an IItemInfo object

        // Update quantities based on transaction type
        if (transaction.type === 'buy') {
            item.quantity! += transactionItem.quantity; // Non-null assertion (!) because quantity is optional
        } else if (transaction.type === 'sale') {
            if (item.quantity! >= transactionItem.quantity) {
                item.quantity! -= transactionItem.quantity;
            } else {
                console.error(`Not enough stock for ${transactionItem.itemId}`);
            }
        }
    });
}


export const appInitialState: IInitialState = {
    storeItems: { items: {} },
    storeSales: {},
    storeBuys: {}
};


// Example usage (buying items with varying prices):
const buy1: IStoreBuyInfo = {
    transactionId: 'buy001',
    date: '2024-10-29',
    items: [
        { itemId: 'xyz', quantity: 10, costPerItem: 5, totalCost: 50 },
        { itemId: 'abc', quantity: 5, costPerItem: 10, totalCost: 50 }
    ],
    totalCost: 100,
    type: 'buy',
    status: 'paid'
};

const buy2: IStoreBuyInfo = {
    transactionId: 'buy002',
    status: 'paid',
    date: '2024-10-30',
    items: [
        { itemId: 'xyz', quantity: 5, costPerItem: 7, totalCost: 35 }, // Price changed!
        { itemId: 'pqr', quantity: 3, costPerItem: 15, totalCost: 45 }
    ],
    totalCost: 80,
    type: 'buy'
};

appInitialState.storeBuys[buy1.transactionId] = buy1;
appInitialState.storeBuys[buy2.transactionId] = buy2;


// Example usage (selling items):
const sale1: IStoreSalesInfo = {
    transactionId: 'sale001',
    date: '2024-10-31',
    status: 'paid',
    items: [
        { itemId: 'xyz', quantity: 7, costPerItem: 10, totalCost: 70 }, // Selling price
        { itemId: 'abc', quantity: 2, costPerItem: 15, totalCost: 30 }
    ],
    totalCost: 100,
    type: 'sale'
};

appInitialState.storeSales[sale1.transactionId] = sale1;


updateInventory(buy1);
updateInventory(buy2);
updateInventory(sale1);

console.log(appInitialState.storeItems);
console.log(appInitialState.storeBuys);
console.log(appInitialState.storeSales);


// Calculate Profit (example):
function calculateProfit(itemId: string): number {
    let totalProfit = 0;
    const sales = Object.values(appInitialState.storeSales);

    sales.forEach(sale => {
        const soldItem = sale.items.find(item => item.itemId === itemId);
        if (soldItem) {
            // Find the most recent purchase price for this item
            let purchasePrice = 0;
            const buys = Object.values(appInitialState.storeBuys).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            for (const buy of buys) {
                const boughtItem = buy.items.find(item => item.itemId === itemId);
                if (boughtItem) {
                    purchasePrice = boughtItem.costPerItem;
                    break; // stop once you find the latest purchase price
                }
            }

            if (purchasePrice === 0) {
                console.warn(`No purchase record found for ${itemId} to calculate profit.`);
            } else {
                totalProfit += (soldItem.costPerItem - purchasePrice) * soldItem.quantity;
            }
        }
    });

    return totalProfit;
}

const profitOnXyz = calculateProfit('xyz');
console.log(`Profit on xyz: ${profitOnXyz}`);