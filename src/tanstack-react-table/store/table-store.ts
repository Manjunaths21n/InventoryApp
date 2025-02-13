import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storeItemReducer from './store-items-slice';
import storeOrderReducer from './store-orders-slice';
import storeSalesReducer from './store-sales-slice';

const rootReducer = combineReducers({
    storeItem: storeItemReducer,
    storeOrder: storeOrderReducer,
    storeSales: storeSalesReducer
})


export const tableStore = configureStore({
    reducer: rootReducer
})

export type TableStoreType = typeof tableStore;
export type RootState = ReturnType<TableStoreType['getState']>;