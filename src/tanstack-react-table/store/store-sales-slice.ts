

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { appInitialState } from './constant-values';
import { IItemInfo, IStoreBillInfo } from './type';

export const storeSalesSlice = createSlice({
    initialState: appInitialState.storeSales,
    name: 'storeSales',
    reducers: {
        addSales: (state, action: PayloadAction<IStoreBillInfo>) => {
            state[action.payload.billId] = action.payload
        },
        deleteSales: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
        updateSalesBill: (state, action: PayloadAction<IStoreBillInfo>) => {
            state[action.payload.billId] = action.payload
        },
        updateSalesItems: (state, action: PayloadAction<{ items: IItemInfo[], billId: string }>) => {
            action.payload.items.forEach(element => {
                state[action.payload.billId].items[element.itemId] = element
            });
        }
    }
})

export const { addSales, deleteSales, updateSalesBill, updateSalesItems } = storeSalesSlice.actions;
export default storeSalesSlice.reducer;

