import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appInitialState } from './constants';


export const storeItemsSlice = createSlice({
    initialState: appInitialState.storeItems,
    name: 'storeItems',
    reducers: {
        updateItemQuantitesById: (state, action: PayloadAction<{ itemId: string, newQuantites: number }>) => {
            state.items[action.payload.itemId].quantity = action.payload.newQuantites;
        },
        updateItemCostById: (state, action: PayloadAction<{ itemId: string, newCost: number }>) => {
            state.items[action.payload.itemId].quantity = action.payload.newCost;
        }
    }
})

export const { updateItemCostById, updateItemQuantitesById } = storeItemsSlice.actions;
export default storeItemsSlice.reducer;
