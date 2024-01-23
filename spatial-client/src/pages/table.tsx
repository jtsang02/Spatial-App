import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "ag-grid-community/styles/ag-theme-balham.css"; // Secondary Theme
import RowData from '../models/rowData';
import { ColDef } from 'ag-grid-community';
import { useState, useEffect, useMemo } from 'react';

// Custom Cell Renderer (Display logos based on cell value)
const CompanyLogoRenderer = (params: CustomCellRendererProps) => (
    <span
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {params.value && (
        <img
          alt={`${params.value} Flag`}
          src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
          style={{
            display: 'block',
            width: '25px',
            height: 'auto',
            maxHeight: '50%',
            marginRight: '12px',
            filter: 'brightness(1.1)',
          }}
        />
      )}
      <p
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {params.value}
      </p>
    </span>
  );
  

const Table: React.FC = () => {
// Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<RowData[]>([]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef[]>([
    {
        field: 'mission',
        filter: true,
        rowDrag: true,
    },
    {
        field: 'company',
        cellRenderer: CompanyLogoRenderer,
    },
    {
        field: 'location',
    },
    { field: 'date' },
    {
        field: 'price',
        valueFormatter: (param) => {
        return '£' + param.value.toLocaleString();
        },
    },
    { field: 'successful' },
    { field: 'rocket' },
    ]);

    // Fetch data & update rowData state
    useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setRowData(rowData)); // Update state of `rowData`
    }, []);

    // Apply settings across all columns
    const defaultColDef = useMemo<ColDef>(() => {
    return {
        filter: true,
        editable: true,
    };
    }, []);

    // Container: Defines the grid's theme & dimensions.
    return (
    <div
        className={
        "ag-theme-quartz-auto-dark"
        }
        style={{ width: '100%', height: '100%' }}
    >
        {/* The AG Grid component, with Row Data & Column Definition props */}
        <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        pagination={false}
        onCellValueChanged={(event) =>
            console.log(`New Cell Value: ${event.value}`)
        }
        />
    </div>
    );
};

export default Table;
