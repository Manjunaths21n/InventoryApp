import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appInitialState } from './constant-values';
import { IItemInfo, IStoreBillInfo } from './type';


export const storeOrdersSlice = createSlice({
    initialState: appInitialState.storeOrders,
    name: 'storeOrders',
    reducers: {
        addOrders: (state, action: PayloadAction<IStoreBillInfo>) => {
            state[action.payload.billId] = action.payload
        },
        deleteOrders: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
        updateOrdersBill: (state, action: PayloadAction<IStoreBillInfo>) => {
            state[action.payload.billId] = action.payload
        },
        updateOrdersItems: (state, action: PayloadAction<{ items: IItemInfo[], billId: string }>) => {
            action.payload.items.forEach(element => {
                state[action.payload.billId].items[element.itemId] = element
            });
        }

    }
})

export const { addOrders, deleteOrders, updateOrdersBill, updateOrdersItems } = storeOrdersSlice.actions;
export default storeOrdersSlice.reducer;
