

import { createSlice } from '@reduxjs/toolkit';
import { appInitialState, IStoreSalesInfo } from './constants';
import type { PayloadAction } from '@reduxjs/toolkit'

export const storeSalesSlice = createSlice({
    initialState: appInitialState.storeSales,
    name: 'storeSales',
    reducers: {
        addSales: (state, action: PayloadAction<IStoreSalesInfo>) => {
            state[action.payload.billId] = action.payload
        },
        deleteSales: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
        updateSales: (state, action: PayloadAction<IStoreSalesInfo>) => {
            state[action.payload.billId] = action.payload
        }
    }
})

export const { addSales, deleteSales, updateSales } = storeSalesSlice.actions;
export default storeSalesSlice.reducer;

