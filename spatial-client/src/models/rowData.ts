interface RowData {
    compartment: string;
    face?: string;
    occupancy?: string;
    height?: number;
    width?: number;
    LD?: number;
    area?: number;
    ratio?: number;
    actOpns?: number;
    sprk?: boolean;
    actualOpenings?: number;
    unprotectedOpenings?: number;
    frr?: string;
    construction?: string;
    cladding?: string;
}

export default RowData;
