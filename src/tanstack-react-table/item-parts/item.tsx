import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getShortId, IItemInfo } from "../store";
import { IAddItem } from "./types";
import { StyledItemsWrapper, StyledLabel, StyledNumberBox, StyledTextBox } from "./styles";
import { StyledButton } from "../common-styles";


export const AddItems = memo((props: IAddItem) => {
    const { onChange } = props;

    const defaultItem: IItemInfo = useMemo(() => ({ costPerItem: 0, itemId: getShortId(), itemName: '', itemsQuantity: 0, totalItemsCost: 0, discount: 0 }), []);
    const [fieldsValue, setFieldsValue] = useState<IItemInfo>(defaultItem);
    const [addNewItem, setAddNewItem] = useState<'save' | 'add'>('save');

    const handleItemName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setFieldsValue(preState => {
            const newState: IItemInfo = {
                ...preState,
                itemName: val

            };
            return newState;
        });
    }, []);

    const handleItemQuantity = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value);
        setFieldsValue(preState => {
            const newState = {
                ...preState,
                itemsQuantity: val,
                totalItemsCost: ((val * preState.costPerItem) - (preState.discount ?? 0))
            };
            return newState;
        });
    }, []);

    const handleCostPerItem = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value);
        setFieldsValue(preState => {
            const newState = {
                ...preState,
                costPerItem: val,
                totalItemsCost: ((val * preState.itemsQuantity) - (preState.discount ?? 0))
            };
            return newState;
        });
    }, []);

    const handleDiscount = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value);
        setFieldsValue(preState => {
            const newState = {
                ...preState,
                discount: val,
                totalItemsCost: ((preState.costPerItem * preState.itemsQuantity) - val)
            };
            return newState;
        });
    }, []);

    const onSaveItem = useCallback(() => {

        if (addNewItem === 'save') {
            setAddNewItem('add');
            onChange?.(fieldsValue);
        } else {
            setAddNewItem('save');
        }
    }, [addNewItem, fieldsValue, onChange]);

    useEffect(() => {
        if (addNewItem === 'save') {
            setFieldsValue(defaultItem);
        }

    }, [addNewItem]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'column' }}>
            <StyledItemsWrapper>
                {addNewItem ? <>
                    <StyledLabel>Item Id :</StyledLabel>
                    <StyledNumberBox readOnly value={fieldsValue.itemId} />
                    <StyledLabel>Item Name:</StyledLabel>
                    <StyledTextBox value={fieldsValue.itemName} onChange={handleItemName} />
                    <StyledLabel>Item Quantity:</StyledLabel>
                    <StyledNumberBox value={fieldsValue.itemsQuantity} onChange={handleItemQuantity} />
                    <StyledLabel>Cost Per Item:</StyledLabel>
                    <StyledNumberBox value={fieldsValue.costPerItem} onChange={handleCostPerItem} />
                    <StyledLabel>Discount:</StyledLabel>
                    <StyledNumberBox value={fieldsValue.discount} onChange={handleDiscount} />
                    <StyledLabel>total Cost:</StyledLabel>
                    <StyledNumberBox readOnly value={fieldsValue.totalItemsCost} />
                </> : <div></div>}
            </StyledItemsWrapper>
            <StyledButton onClick={onSaveItem}>{addNewItem === 'save' ? 'Save Item' : 'Add Item'}</StyledButton>

        </div>
    );
});
