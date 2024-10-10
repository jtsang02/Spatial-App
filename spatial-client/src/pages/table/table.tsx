import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-balham.css"; // Secondary Theme
import RowData from '../../models/rowData';
import { ColDef, RowValueChangedEvent } from 'ag-grid-community';
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { columnDefs } from './columnDefinitions';

const BLANKROWS = 22;
const defaultBlankRows: RowData[] = Array.from({ length: BLANKROWS }, (_, index) => ({
  id: `cmpt-${index + 1}`,
  compartment: `Compartment ${index + 1}`,
}));

export const Table: React.FC = () => {

  const [rowData, setRowData] = useState<RowData[]>(defaultBlankRows);
  const [colDefs] = useState<ColDef[]>(columnDefs);

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