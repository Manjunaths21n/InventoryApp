import React from 'react'
import ReactDOM from 'react-dom/client'


import {
    Header
} from '@tanstack/react-table'
import { IStoreColumn } from '../types'


export function Sort({ header }: { header: Header<IStoreColumn, unknown> }) {

    return (
        <div
            className={
                header.column.getCanSort()
                    ? 'cursor-pointer select-none'
                    : ''
            }
            onClick={header.column.getToggleSortingHandler()}
            title={
                header.column.getCanSort()
                    ? header.column.getNextSortingOrder() === 'asc'
                        ? 'Sort ascending'
                        : header.column.getNextSortingOrder() === 'desc'
                            ? 'Sort descending'
                            : 'Clear sort'
                    : undefined
            }
        >

            {{
                asc: ' 🔼',
                desc: ' 🔽',
            }[header.column.getIsSorted() as string] ?? null}
        </div>
    )
}

