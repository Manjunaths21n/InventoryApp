import { createContext } from 'react';

export interface IReactTableContext {
    onColumnGroup(): void;
}

export const ReatTableContext = createContext({} as IReactTableContext);

