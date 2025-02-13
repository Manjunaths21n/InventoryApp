import styled from 'styled-components';

export const StyledBodyWrapper = styled.div`
    height: calc(100% - 80px);
    overflow: auto;
    border-bottom: 1px solid gray;
`

export const StyledBodyItemWrapper = styled.div`
    display: flex;
    height: 50px;
    border-bottom: 1px solid lightgray;

`

export const StyledBodyItem = styled.div<{ width?: string }>`
width: ${({ width }) => (width ?? '200px')};
padding: 5px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

`
