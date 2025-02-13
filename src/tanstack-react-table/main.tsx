import { memo, useCallback, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ReactTable } from './react-table';
import { IInitialState, storeItemsData, storeSalesData } from './store/constants';
import { getStorSalesColumns, getStorOrderColumns, getStorColumns } from './react-table/columns';

export const TanstackReactTable = memo(() => {

    const [activeTable, setActiveTable] = useState<keyof IInitialState>('storeItems')
    const [editIndex, setEditIndex] = useState(-1);
    const actionTypeRef = useRef('');

    const onSave = () => {
        actionTypeRef.current = '';
        setEditIndex(-1);

    };
    const onCancel = () => {
        actionTypeRef.current = '';
        setEditIndex(-1);
    }
    const onEdit = (index: number) => {
        actionTypeRef.current = 'Edit';
        setEditIndex(index);
    }

    const columnsInfo = useRef({
        storSalesColumns: getStorSalesColumns({ onEdit, onCancel, onSave }),
        storOrderColumns: getStorOrderColumns({ onEdit, onCancel, onSave }),
        storColumns: getStorColumns({ onEdit, onCancel, onSave }),
    })

    const onSalesButton = useCallback(() => {
        setActiveTable('storeSales');
    }, []);

    const onBuyButton = useCallback(() => {
        setActiveTable('storeOrders');
    }, []);

    const onStoreButton = useCallback(() => {
        setActiveTable('storeItems');
    }, []);

    const handleAddRecord = useCallback(() => {
        if (actionTypeRef.current !== 'Add') {
            actionTypeRef.current = 'Add';
            // setTableData(preState => ([{ costPerItem: 0, itemId: 'a1', itemName: 'asd', quantity: 0, totalCost: 0 }, ...preState]));
            setEditIndex(0);
        }
    }, []);


    return (
        <StyledContainer>
            <StyledNavePanel>
                <StyledSalesButton isSelected={activeTable === 'storeSales'} onClick={onSalesButton} >Sales</StyledSalesButton >
                <StyledOrderButton isSelected={activeTable === 'storeOrders'} onClick={onBuyButton}>Buy</StyledOrderButton>
                <StyledItemsButton isSelected={activeTable === 'storeItems'} onClick={onStoreButton}>Store</StyledItemsButton>
            </StyledNavePanel>
            {activeTable === 'storeItems' && <StyledTableWrapper >
                <StyledAddRecordButton onClick={handleAddRecord}>Add Record</StyledAddRecordButton>
                <ReactTable columnsInfo={columnsInfo.current.storColumns} data={storeItemsData} editRowIndex={editIndex} />
            </StyledTableWrapper>
            }
            {activeTable === 'storeOrders' && <StyledTableWrapper >
                <StyledAddRecordButton onClick={handleAddRecord}>Add Record</StyledAddRecordButton>
                <ReactTable columnsInfo={columnsInfo.current.storOrderColumns} data={storeSalesData} editRowIndex={editIndex} />
            </StyledTableWrapper>
            }
            {activeTable === 'storeSales' && <StyledTableWrapper >
                <StyledAddRecordButton onClick={handleAddRecord}>Add Record</StyledAddRecordButton>
                <ReactTable columnsInfo={columnsInfo.current.storSalesColumns} data={storeSalesData} editRowIndex={editIndex} />
            </StyledTableWrapper>
            }
        </StyledContainer>
    );
});

export const StyledContainer = styled.div`
display: flex;
`;
export const StyledTableWrapper = styled.div`
display: flex;
flex-flow: column;
`;
export const StyledAddRecordButton = styled.button`
    width: 100px;
    height: 40px;
    background-color: #c7ebeb;
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
    background-color: ${({ isSelected }) => (isSelected ? 'lightgreen' : '#1af11a')};
`


export const StyledOrderButton = styled(StyledButtons) <{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? 'lightblue' : '#26bbec')};
`

export const StyledItemsButton = styled(StyledButtons) <{ isSelected: boolean }>`
    background-color: ${({ isSelected }) => (isSelected ? '#f8e1b2' : '#f7c35d')};
` 