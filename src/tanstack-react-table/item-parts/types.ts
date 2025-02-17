import { IItemInfo } from "../store";

export interface IAddItems {
    onSuccess(value: IItemInfo[]): void;
    onCancel(): void;
}

export interface IAddItem {
    onChange?(value: IItemInfo): void;
}
