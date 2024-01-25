import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-balham.css"; // Secondary Theme
import RowData from '../models/rowData';
import { ColDef } from 'ag-grid-community';
import { useState, useEffect, useMemo } from 'react';

const BLANKROWS = 22;
const defaultBlankRows: RowData[] = Array.from({ length: BLANKROWS }, (_, index) => ({
    id: `blank-${index + 1}`,
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
      width: 80,
      cellEditorSelector: () => {
          return {
            component: 'agSelectCellEditor',
            params: {
              values: ['', 'North', 'East', 'South', 'West'],
            },
          };
      },
    },
    {
      field: 'height (m)',
      colId: 'h',
      editable: true,
    },
    {
      field: 'width (m)',
      colId: 'w',
      editable: true,
    },
    {
      field: 'LD (m)',
      colId: 'LD',
      editable: true,
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
    },
    {
      field: 'sprinklered',
      checkboxSelection: true,
      cellStyle: { display: 'flex', justifyContent: 'center' },
    },
    {
      field: 'actual Openings',
      colId: 'actOpns',
      valueFormatter: valueFormatterPercentage,
      width: 150,
    },
    { field: 'Openings Permitted',
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

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz-auto-dark"}
      style={{ width: '100%', height: '100%' }}
    >
      {/* The AG Grid component, with Row Data & Column Definition props */}
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        pagination={false}
        gridOptions={{
          domLayout: 'autoHeight',
        }}
        onCellValueChanged={(event) =>
          // Update rowData state with new data
          setRowData([...rowData, event.data])
        }
      />
    </div>
  );
};

export default Table;
