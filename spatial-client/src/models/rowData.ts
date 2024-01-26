interface RowData {
    id: string;
    compartment: string;
    face?: string | null;
    group?: string | null;
    height?: number | null;
    width?: number | null;
    LD?: number | null;
    area?: number | null;
    ratio?: number | null;
    actOpns?: number | null;
    sprk?: boolean | null;
    actualOpenings?: number | null;
    unprotectedOpenings?: number | null;
    frr?: string | null;
    construction?: string | null;
    cladding?: string | null;
}

export default RowData;
