import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appInitialState } from './constant-values';


export const storeItemsSlice = createSlice({
    initialState: appInitialState.storeItems,
    name: 'storeItems',
    reducers: {
        updateItemQuantitesById: (state, action: PayloadAction<{ itemId: string, newQuantites: number }>) => {
            state[action.payload.itemId].itemsQuantity = action.payload.newQuantites;
        },
        updateItemCostById: (state, action: PayloadAction<{ itemId: string, newCost: number }>) => {
            state[action.payload.itemId].itemsQuantity = action.payload.newCost;
        }
    }
})

export const { updateItemCostById, updateItemQuantitesById } = storeItemsSlice.actions;
export default storeItemsSlice.reducer;
