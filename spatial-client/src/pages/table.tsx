import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-balham.css"; // Secondary Theme
import RowData from '../models/rowData';
import { ColDef, RowValueChangedEvent } from 'ag-grid-community';
import { useState, useEffect, useMemo, useCallback } from 'react';
import valueFormatterPercentage from '../utils/formatPercent';
import axios, { AxiosError } from 'axios';

const BLANKROWS = 22;
const defaultBlankRows: RowData[] = Array.from({ length: BLANKROWS }, (_, index) => ({
  id: `cmpt-${index + 1}`,
  compartment: `Compartment ${index + 1}`,
}));

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
      field: 'group',
      filter: true,
      editable: true,
      cellEditorSelector: () => {
        return {
          component: 'agSelectCellEditor',
          params: {
            values: ['A', 'B', 'C', 'D', 'E', 'F-1', 'F-2', 'F-3'],
          },
        };
      },
      width: 100,
    },
    {
      field: 'height',
      headerName: 'Height (m)',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0.0001,
      },
    },
    {
      field: 'width',
      headerName: 'Width (m)',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0.0001,
      },
    },
    {
      field: 'LD',
      headerName: 'LD (m)',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: 'area',
      headerName: 'Area (m²)',
      valueGetter: (params) => {
        if (!params.data.height || !params.data.width) {
          return null;
        } else {
          return (params.data.height * params.data.width).toFixed(2);
        }
      },
    },
    {
      field: 'ratio',
      valueGetter: (params) => {
        if (!params.data.height || !params.data.width) {
          return null;
        } else {
          return (Math.max(params.data.height, params.data.width) /
            Math.min(params.data.height, params.data.width)).toFixed(2);
        }
      },
      editable: false,
      width: 75,
    },
    {
      field: 'actOpns',
      headerName: 'Openings (m²)',
      editable: true,
      width: 125,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: 'sprk',
      headerName: 'Sprinklered',
      cellEditorSelector: () => {
        return {
          component: 'agSelectCellEditor',
          params: {
            values: ['Yes', 'No'],
          },
        };
      },
      editable: true,
    },
    {
      field: 'actualOpenings',
      headerName: 'UPO-A (%)',
      valueFormatter: valueFormatterPercentage,
    },
    {
      field: 'unprotectedOpenings',
      headerName: 'UPO-P (%)',
      valueFormatter: valueFormatterPercentage,
    },
    {
      field: 'frr',
      headerName: 'Rating',
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

  }, []);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: false,
      width: 110,
    };
  }, []);

  const handleRowValueChanged = useCallback(async (e: RowValueChangedEvent) => {
    const data = e.data;
    // check if required parameters for calculation are present
    // required: height, width, LD, sprk, group
    if (data.height !== null && data.width!== null && data.LD !== null 
        && data.sprk !== null && data.group !== null) {
      const reqbody = {
        'h': data.height,
        'w': data.width,
        'LD': data.LD,
        'actOpns': data.actOpns === null ? 0 : data.actOpns,
        'sprk': data.sprk === 'Yes',
        'group': data.group,
      };
      await axios.post('http://localhost:3000/calculate', reqbody).then((response) => {
          const res = response.data;
          console.log(res);
          data.actualOpenings = res.actualOpenings;
          data.unprotectedOpenings = res.unprotectedOpenings;
          data.frr = res.frr;
          data.construction = res.construction;
          data.cladding = res.cladding;
        }).catch((error: Error | AxiosError) => {
          if (axios.isAxiosError(error) && error.response?.status === 400) {
            // reset returned values to null
            data.actualOpenings = null;
            data.unprotectedOpenings = null;
            data.frr = null;
            data.construction = null;
            data.cladding = null;
            alert(error.response.data.errors[0]);
          } else {
            alert('An unknown error occurred');
          }
        });
    }
    // update rowData state with new data
    setRowData(rowData.map((row) => {
      if (row.id === data.id) {
        return data;
      } else {
        return row;
      }
    }));
  }, [rowData]);

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
        onRowValueChanged={handleRowValueChanged}

      />
    </div>
  );
};

export default Table;