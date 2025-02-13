

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appInitialState, IStoreSalesInfo } from './constants';


export const storeOrdersSlice = createSlice({
    initialState: appInitialState.storeOrders,
    name: 'storeOrders',
    reducers: {
        addOrders: (state, action: PayloadAction<IStoreSalesInfo>) => {
            state[action.payload.billId] = action.payload
        },
        deleteOrders: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
        updateOrders: (state, action: PayloadAction<IStoreSalesInfo>) => {
            state[action.payload.billId] = action.payload
        }

    }
})

export const { addOrders, deleteOrders, updateOrders } = storeOrdersSlice.actions;
export default storeOrdersSlice.reducer;
