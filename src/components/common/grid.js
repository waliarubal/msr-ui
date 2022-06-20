import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
const Grid = (props) => {    
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit()
    }
    return (
        <div className="ag-theme-balham" style={{ height: '200px', width: '98%' }}>
            <AgGridReact
                columnDefs={props.columnDefs}
                rowData={props.rowData}
                onGridReady={onGridReady}
                frameworkComponents={props.frameworkComponents}>
            </AgGridReact>
        </div >
    )

}
export default Grid