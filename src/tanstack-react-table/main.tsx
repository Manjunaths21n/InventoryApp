import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { ReactTable } from './react-table';
import {
    IInitialState, storeItemsColumnInfo, IColumnNamesInfo, storeSalesColumnInfo, storeBuyColumnInfo, selectSoreItems, selectSoresales, selectSoreOrders,
    IStoreItemsInfo,
    IItemInfo,
    updateSalesItems,
    ColumnKeyMapper,
    updateOrdersItems
} from './store';
import { preparecolumns } from './react-table/columns';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { StyledContainer, StyledNavePanel, StyledSalesButton, StyledOrderButton, StyledItemsButton, StyledTableWrapper, StyledPageHeaderWrapper, StyledAddRecordButton, StyledFlyoutWarpper } from './main-styles';
import { ItemsTableAdd, TableActionButtons } from './action-buttons';
import { ItemsRenderer } from './item-parts';

export const TanstackReactTable = memo(() => {

    const dispatch = useAppDispatch()
    const soreItems = useAppSelector(selectSoreItems);
    const soresales = useAppSelector(selectSoresales);
    const soreOrders = useAppSelector(selectSoreOrders);

    const [activeTable, setActiveTable] = useState<keyof IInitialState>('storeItems')
    const [editIndex, setEditIndex] = useState(-1);
    const [showFlyout, setShowFlyout] = useState(false);
    const actionTypeRef = useRef('');
    const modifyBillIdRef = useRef('');

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

    const actionColumn = useCallback((allowRowSelection: boolean) => (preparecolumns({
        columns: [
            { columnDisplayName: 'Action', columnName: 'Action', cell: (args: any) => <TableActionButtons {...{ ...args, onSave, onEdit, onCancel, allowRowSelection }} /> }
        ], enableFilter: false, enableGrouping: false, enableSorting: false
    })), []);

    const getColumnInfo = useCallback((column: IColumnNamesInfo[]) => (
        preparecolumns({
            columns: column.filter(({ showColumn }) => showColumn).map(
                ({ columnDisplayName, columnName }) => ({ columnDisplayName, columnName })
            ),
            enableFilter: true, enableGrouping: true, enableSorting: true
        })
    ), []);

    const columnsInfo = useMemo(() => ({
        storSalesColumns: [...actionColumn(true), ...getColumnInfo(storeSalesColumnInfo)],
        storOrderColumns: [...actionColumn(true), ...getColumnInfo(storeBuyColumnInfo)],
        storColumns: [...actionColumn(false), ...getColumnInfo(storeItemsColumnInfo)],
    }), [actionColumn, getColumnInfo]);

    const onSalesButton = useCallback(() => {
        setActiveTable('storeSales');
        setEditIndex(-1);
    }, []);

    const onBuyButton = useCallback(() => {
        setActiveTable('storeOrders');
        setEditIndex(-1);
    }, []);

    const onStoreButton = useCallback(() => {
        setActiveTable('storeItems');
        setEditIndex(-1);
    }, []);

    const handleAddRecord = useCallback(() => {
        if (actionTypeRef.current !== 'Add') {
            actionTypeRef.current = 'Add';
            // setTableData(preState => ([{ costPerItem: 0, itemId: 'a1', itemName: 'asd', quantity: 0, totalCost: 0 }, ...preState]));
            // setEditIndex(0);
            if (activeTable === 'storeSales') {
                setShowFlyout(true);
                // dispatch(addSales(getDummyStoreSalesData()))
            } else if (activeTable === 'storeOrders') {
                setShowFlyout(true);
                // dispatch(addOrders(getDummyStoreSalesData()))

            }
        }
    }, [activeTable]);

    const handleAddItems = useCallback((billId: string) => {
        modifyBillIdRef.current = billId;
        setShowFlyout(true);
    }, []);

    const onFlyoutSuccess = useCallback((val: IItemInfo[]) => {
        setShowFlyout(false);
        dispatch(
            activeTable === 'storeSales' ?
                updateSalesItems({ billId: modifyBillIdRef.current, items: val }) :
                updateOrdersItems({ billId: modifyBillIdRef.current, items: val })
        );
    }, [activeTable, dispatch]);

    const onFlyoutCancel = useCallback(() => {
        setShowFlyout(false);
    }, []);


    return (
        <StyledContainer>
            <StyledNavePanel>
                <StyledSalesButton isSelected={activeTable === 'storeSales'} onClick={onSalesButton} >Sales</StyledSalesButton >
                <StyledOrderButton isSelected={activeTable === 'storeOrders'} onClick={onBuyButton}>Buy</StyledOrderButton>
                <StyledItemsButton isSelected={activeTable === 'storeItems'} onClick={onStoreButton}>Store</StyledItemsButton>
            </StyledNavePanel>
            {activeTable === 'storeItems' && <StyledTableWrapper >
                <StyledPageHeaderWrapper />
                <ReactTable columnsInfo={columnsInfo.storColumns} data={soreItems} editRowIndex={editIndex} />
            </StyledTableWrapper>
            }
            {activeTable === 'storeOrders' && <StyledTableWrapper >
                <StyledPageHeaderWrapper>

                    <StyledAddRecordButton onClick={handleAddRecord}>Add Stock In</StyledAddRecordButton>
                </StyledPageHeaderWrapper>
                <ReactTable
                    columnsInfo={columnsInfo.storOrderColumns}
                    data={soreOrders}
                    editRowIndex={editIndex}
                    renderNestedTable={(args: any) => { return (<div><NestedItemsTable items={args[ColumnKeyMapper.ITEMS]} handleAddItems={handleAddItems} billId={args[ColumnKeyMapper.BILL_ID]} /></div>); }}
                />
            </StyledTableWrapper>
            }
            {activeTable === 'storeSales' && <StyledTableWrapper >
                <StyledPageHeaderWrapper>
                    <StyledAddRecordButton onClick={handleAddRecord}>Add Stock Out</StyledAddRecordButton>
                </StyledPageHeaderWrapper>
                <ReactTable
                    columnsInfo={columnsInfo.storSalesColumns}
                    data={soresales}
                    editRowIndex={editIndex}
                    renderNestedTable={(args: any) => { return (<div><NestedItemsTable items={args.items} handleAddItems={handleAddItems} billId={args.billId} /></div>); }}
                />
            </StyledTableWrapper>
            }
            {showFlyout && (
                <StyledFlyoutWarpper data-show={showFlyout ? "true" : "false"} className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <ItemsRenderer onCancel={onFlyoutCancel} onSuccess={onFlyoutSuccess} />

                </StyledFlyoutWarpper>
            )}
        </StyledContainer>
    );
});

export const NestedItemsTable = memo((props: { items: IStoreItemsInfo, handleAddItems: (billId: string) => void, billId: string }) => {

    const { items, handleAddItems, billId } = props;

    const itemsList = Object.values(items);

    const actionColumn = useMemo(() => (preparecolumns({
        columns: [
            { columnDisplayName: 'Action', columnName: 'Action', cell: (args: any) => <ItemsTableAdd {...{ ...args, onClick: handleAddItems, billId }} /> }
        ], enableFilter: false, enableGrouping: false, enableSorting: false
    })), [handleAddItems]);

    const getColumnInfo = useCallback((column: IColumnNamesInfo[]) => (
        [...actionColumn, ...preparecolumns({
            columns: column.filter(({ showColumn }) => showColumn).map(
                ({ columnDisplayName, columnName }) => ({ columnDisplayName, columnName })
            ),
            enableFilter: true, enableGrouping: true, enableSorting: true
        })]
    ), [actionColumn]);

    return <ReactTable
        columnsInfo={getColumnInfo(storeItemsColumnInfo)}
        data={itemsList}
        height='auto'
    />
});
