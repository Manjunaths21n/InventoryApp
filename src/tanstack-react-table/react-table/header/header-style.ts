import styled from 'styled-components';

export const StyledHeaderWrapper = styled.div`
    height: auto;
    border-bottom: 1px solid gray;
`

export const StyledHeaderItemWrapper = styled.div`
    display: flex;
    font-weight: bold;
    height: auto;
`

export const StyledHeaderItem = styled.div<{ width?: string }>`
cursor: pointer;
display: flex;
width: ${({ width }) => (width ?? '200px')};
flex-flow: wrap;
padding: 5px;
`;