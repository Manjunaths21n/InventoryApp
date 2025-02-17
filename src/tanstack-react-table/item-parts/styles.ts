import styled from "styled-components";

export const StyledNumberBox = styled.input.attrs({ type: 'number' })`
height: 35px;
min-width: 40px;
`;
export const StyledTextBox = styled.input.attrs({ type: 'text' })`
height: 35px;
min-width: 40px;
`;

export const StyledLabel = styled.label``;

export const StyledItemsWrapper = styled.div`
width:100%;
display: grid;
row-gap: 10px;
grid-template-columns: 23% 75%;
`;

export const StyledAddItemsContainer = styled.div`
width:100%;
height: 100%;
display: grid;
row-gap: 10px;
grid-template-rows: 1fr 300px;
`;

export const StyledItemsRendererContainer = styled.div`
width:100%;
height: 100%;
display: grid;
row-gap: 5px;
grid-template-rows: 1fr 50px;
`;

export const StyledAddItemsContainerFooter = styled.div`
height: 45px;
display: flex;
`;

export const StyledItemsList = styled.div`
grid-template-columns: 50% 20% 20%;
width:100%;
display: grid;
row-gap: 10px;
border-top: 1px solid gray;
`;
