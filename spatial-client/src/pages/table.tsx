import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-balham.css"; // Secondary Theme
import RowData from '../models/rowData';
import { ColDef, CellValueChangedEvent, RowValueChangedEvent } from 'ag-grid-community';
import { useState, useEffect, useMemo, useCallback } from 'react';

const BLANKROWS = 22;
const defaultBlankRows: RowData[] = Array.from({ length: BLANKROWS }, (_, index) => ({
  id: `cmpt-${index + 1}`,
  compartment: `Compartment ${index + 1}`,
}));


const valueFormatterPercentage = (param: { value: number; }) => {
  if (param.value) {
    return param.value.toLocaleString() + '%';
  } else {
    return '';
  }
};

const Table: React.FC = () => {
  
  const [rowData, setRowData] = useState<RowData[]>(defaultBlankRows);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: 'compartment',
      filter: true,
      rowDrag: true,
      editable: true,
      width: 200,
    },
    {
      field: 'face',
      filter: true,
      editable: true,
      cellEditorSelector: () => {
        return {
          component: 'agSelectCellEditor',
          params: {
            values: ['', 'North', 'East', 'South', 'West'],
          },
        };
      },
      width: 80,
    },
    {
      field: 'height (m)',
      colId: 'h',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0.0001,
      },
    },
    {
      field: 'width (m)',
      colId: 'w',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0.0001,
      },
    },
    {
      field: 'LD (m)',
      colId: 'LD',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: 'area (m²)',
      colId: 'area',
      valueGetter: (params) => {
        if (isNaN(params.data.height) || isNaN(params.data.width)) {
          return null;
        } else {
          return params.data.height * params.data.width;
        }
      },
    },
    {
      field: 'ratio',
      valueGetter: (params) => {
        if (isNaN(params.data.height) || isNaN(params.data.width)) {
          return null;
        } else {
          return Math.max(params.data.height, params.data.width) / Math.min(params.data.height, params.data.width);
        }
      },
      editable: false,
      width: 75,
    },
    {
      field: 'unprotected openings (m²)',
      colId: 'unprotectedOpenings',
      editable: true,
      width: 210,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: 'sprinklered',
      checkboxSelection: true,
      cellStyle: { display: 'flex', justifyContent: 'center' },
      editable: true,
    },
    {
      field: 'actual Openings',
      colId: 'actOpns',
      valueFormatter: valueFormatterPercentage,
      width: 150,
    },
    {
      field: 'Openings Permitted',
      colId: 'opnsPermitted',
      valueFormatter: valueFormatterPercentage,
      width: 175,
    },
    {
      field: 'construction',
      width: 150,
    },
    {
      field: 'cladding',
      width: 150,
    },
  ]);

  // Fetch data & update rowData state
  useEffect(() => {
    // fetch('ht//www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
    //   .then((result) => result.json()) // Convert to JSON
    //   .then((rowData) => setRowData(rowData)); // Update state of `rowData`tps:
  }, []);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: false,
      width: 110,
    };
  }, []);

  const onCellValueChanged = useCallback((e: CellValueChangedEvent) => {
    // Update rowData state with new data
    console.log('onCellValueChanged: ' + e.colDef.field + ' = ' + e.newValue
    );
  }, []);

  const onRowValueChanged = useCallback((e: RowValueChangedEvent) => {
    const data = e.data;
    // Update rowData state with new data
    console.log('onRowValueChanged: ' + JSON.stringify(data));
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz-auto-dark"}
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        pagination={false}
        editType='fullRow'
        onCellValueChanged={onCellValueChanged}
        onRowValueChanged={onRowValueChanged}
      />
    </div>
  );
};

export default Table;
