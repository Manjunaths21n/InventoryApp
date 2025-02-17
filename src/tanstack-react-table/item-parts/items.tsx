import { memo, useCallback, useState } from "react";
import { IItemInfo } from "../store";
import { AddItems } from "./item";
import { StyledAddItemsContainer, StyledAddItemsContainerFooter, StyledItemsList, StyledItemsRendererContainer } from "./styles";
import { IAddItems } from "./types";
import styled from "styled-components";

export const ItemsRenderer = memo((props: IAddItems) => {
    const { onCancel, onSuccess } = props;

    const [items, setItems] = useState<IItemInfo[]>([]);

    const onAddItem = useCallback((val: IItemInfo) => {
        setItems(preState => {
            const clonedPreState = [val, ...preState];
            // clonedPreState.unshift(val);
            console.log(preState);
            console.log(val);
            return clonedPreState;
        });
    }, []);

    const _onSuccess = useCallback(() => {
        onSuccess(items);
    }, [items, onSuccess]);

    return (
        <StyledItemsRendererContainer>
            <StyledAddItemsContainer>
                <AddItems onChange={onAddItem} />
                <StyledNewItemsListWrapper>
                    {items.length && <StyledItemsList >
                        <div>{'Item Id'}</div>
                        <div>{'Items Quantity'}</div>
                        <div>{'Total Items Cost'}</div>
                    </StyledItemsList>}
                    {items.map(({ itemId, itemsQuantity, totalItemsCost }) => (
                        <StyledItemsList key={itemId}>
                            <div>{itemId}</div>
                            <div>{itemsQuantity}</div>
                            <div>{totalItemsCost}</div>
                        </StyledItemsList>
                    ))}
                </StyledNewItemsListWrapper>
            </StyledAddItemsContainer>
            <StyledAddItemsContainerFooter>

                <button onClick={_onSuccess}>OK</button>
                <button onClick={onCancel}>Cancel</button>
            </StyledAddItemsContainerFooter>
        </StyledItemsRendererContainer>
    );
});

export const StyledNewItemsListWrapper = styled.div`
    border: 1px solid;
    border-radius: 5px;
    overflow-y: auto;
`;

