import { Header } from '@tanstack/react-table';
import { useCallback, useState } from 'react';

import myImage from '../../../assets/images/funnel-check-icon.png';


export const TableFilter = <T extends object>({ header }: { header: Header<T, unknown> }) => {
    const { column: { setFilterValue, getFilterValue, getCanFilter }, } = header;

    const [filterState, setFilterState] = useState({ firstValue: '', secondValue: '', operator: 'AND' });
    const [showFilter, setShowFilter] = useState(false);

    const filterValue = getFilterValue();
    const canFilter = getCanFilter();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleOperatorChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterState(prev => ({ ...prev, operator: e.target.value }));
    }, []);

    const handleClearFilter = useCallback(() => {
        setFilterState({ firstValue: '', secondValue: '', operator: 'And' });
        setFilterValue(undefined);
        setShowFilter(false);
    }, [setFilterValue]);

    const handleApplyFilter = useCallback(() => {
        setFilterValue({
            value1: filterState.firstValue.toLowerCase(),
            value2: filterState.secondValue.toLowerCase(),
            operator: filterState.operator
        });
        setShowFilter(false);
    }, [filterState, setFilterValue]);

    return (
        <div style={{ position: 'relative' }}>

            {(filterValue && canFilter) ? <button>
                <img
                    src={myImage}
                    alt="Sort"
                    width={14} // Adjust width as needed
                    height={14} // Adjust height as needed
                    style={{ verticalAlign: 'middle' }}
                />
            </button> :
                <button onClick={() => { setShowFilter(preState => !preState) }}>
                    <img
                        src="https://media.lordicon.com/icons/system/solid/110-filter.svg"
                        alt="Sort"
                        width={14} // Adjust width as needed
                        height={14} // Adjust height as needed
                        style={{ verticalAlign: 'middle' }}
                    />
                </button >
            }
            {(showFilter && canFilter) ? (
                <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    {/* <Filter column={header.column} /> */}
                    <input type="text" name="firstValue" value={filterState.firstValue} onChange={handleInputChange} />
                    <select name="operator" value={filterState.operator} onChange={handleOperatorChange}>
                        <option>AND</option>
                        <option>OR</option>
                    </select>
                    <input type="text" name="secondValue" value={filterState.secondValue} onChange={handleInputChange} />
                    <button onClick={handleApplyFilter}>Apply Filter</button>
                    <button onClick={handleClearFilter}>Clear Filter</button>
                </div>
            ) : null
            }

        </div>
    );
}
