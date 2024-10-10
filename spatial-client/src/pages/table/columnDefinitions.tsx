import { ColDef } from 'ag-grid-community';
import valueFormatterPercentage from '../../utils/formatPercent';

export const columnDefs: ColDef[] = [
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
];