import styled, { keyframes } from "styled-components";

export const StyledContainer = styled.div`
display: flex;
`;
export const StyledTableWrapper = styled.div`
display: flex;
flex-flow: column;
`;
export const StyledAddRecordButton = styled.button`
    width: auto;
    height: 40px;
    background-color: #c7ebeb;
`
export const StyledPageHeaderWrapper = styled.div`
    height: 50px;
`
export const StyledNavePanel = styled.div`
    height: 100vh;
    border-right: 1px solid;
    margin-right: 10px;
    width: 200px;
`

export const StyledButtons = styled.div`
    margin: 10px;
    padding:5px;
    border-radius: 10px;
    height: 30px;
    width: auto;
`

export const StyledSalesButton = styled(StyledButtons) <{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? '#d2fcd2' : '#1af11a')};
`


export const StyledOrderButton = styled(StyledButtons) <{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? '#cdedf8' : '#26bbec')};
`

export const StyledItemsButton = styled(StyledButtons) <{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? '#f7ebd2' : '#f8a808')};
`


export const slideIn = keyframes`
  from {
    transform: translateX(100%); /* Start off-screen to the right */
    opacity: 0;
  }
  to {
    transform: translateX(0); /* Slide to its final position */
    opacity: 1;
  }
`;


export const StyledFlyoutWarpper = styled.div`
     position: absolute;
  top: 0; /* Position below the trigger */
  right: 0;
  height: 100%;
  width: 450px; /* Or whatever width you want */
  background-color: #f3a7a7;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  box-sizing: border-box;
  opacity: 0;
  /* transform: translateY(-10px); */
  border-radius: 8px;

  /* Key change: Use the & and a dynamic attribute */
  &[data-show='true'] {
    opacity: 1;
  transition: all 2s ease-out;
  animation: ${slideIn} 0.3s ease-in-out forwards;  
  }
`;
