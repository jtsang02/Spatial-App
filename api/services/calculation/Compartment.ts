import { tableB, tableC, tableD, tableE, constructionTable } from "./tables";

interface Parameters {
  table: number[][]; // The table to be used for the calculation.
  maxLD: number; // The maximum LD value for the table.
  maxArea: number; // The maximum area for the table.
  z: number; // The ratio code.
  shift_y: number; // The shift in y direction for the table.
}

class Compartment {

  /**
   * Represents a compartment.
   * @param h - The height of the compartment in m.
   * @param w - The width of the compartment in m.
   * @param LD - The LD value of the compartment in m2.
   * @param actOpns - The actual opening area of the compartment in m2.
   * @param sprk - Indicates if the compartment is sprinklered.
   * @param group - The occupancy to which the compartment belongs.
   */

  public h: number;
  public w: number;
  public LD: number;
  public actOpns: number;
  public sprk: boolean;
  public group: string;

  public constructor(
        h: number,
        w: number,
        LD: number,
        actOpns: number,
        sprk: boolean,
        group: string) {
    this.h = h;
    this.w = w;
    this.LD = LD;
    this.actOpns = actOpns;
    this.sprk = sprk;
    this.group = group;
  }

  /**
   * Indicates if the compartment is a high hazard occupancy.
   * @returns True if the compartment is a Group E, F-1 or F-2, false otherwise.
   */
  get hazard(): boolean {
    return this.group === "E" || this.group === "F-1" || this.group === "F-2";
  }

  /**
   * Calculates the area of the compartment.
   * @returns The area.
   */
  get area(): number {
    return this.h * this.w;
  }

  /**
   * Calculates the height to width ratio of the compartment.
   * @returns The ratio.
   */
  get ratio(): number {
    return this.h / this.w > this.w / this.h ? this.h / this.w : this.w / this.h;
  }

  /**
    * Calculates the height to width ratio of the compartment and assigns a numerical value to it.
    * @returns The ratio code (1, 2 or 3).
  */
  private ratioCode(): number {
    let ratio = this.ratio;

    switch (true) {
      case ratio < 3:
        return 1;

      case ratio <= 10:
        return 2;

      default:
        return 3;
    }
  }

  /**
   * Calculates the percentage of actual openings in relation to the total area of the compartment.
   * @returns The percentage of actual openings.
   */
  get areaOfOpenings(): number {
    return this.actOpns ? (this.actOpns / this.area) * 100 : 0;
  }

  /**
   * Determines the table and other parameters to be used for the calculation.
   * @returns The parameters as an object.
   */
  private getParameters(): Parameters {

    if (this.sprk) {

      if (this.hazard) {
        return {
          table: tableE,
          maxLD: 15,
          maxArea: 200,
          z: 0,
          shift_y: 1
        };
      } else {
        return {
          table: tableD,
          maxLD: 9,
          maxArea: 150,
          z: 0,
          shift_y: 1
        };
      }
    }

    if (this.hazard) {
      return {
        table: tableC,
        maxLD: 70,
        maxArea: 2000,
        z: this.ratioCode(),
        shift_y: 3
      };
    }

    return {
      table: tableB,
      maxLD: 50,
      maxArea: 2000,
      z: this.ratioCode(),
      shift_y: 3
    };
  }

  /**
   * Calculates the percentage of permitted openings in relation to the total area of the compartment.
   * @returns The percentage of openings.
   */
  get unprotectedOpenings(): number {

    let y: number = 0;
    let area1: number = 0;
    let area2: number = 0;
    
    const { table, maxLD, maxArea, z, shift_y } = this.getParameters();

    const isLDlarger = (element: number) => element > this.LD;
    let x: number = table[0].findIndex(isLDlarger) - 1;
    let LD1: number = table[0][x];
    let LD2: number = table[0][x + 1];

    for (let j = 0; j < table.length; j++)
      if (this.area >= table[j][0] && z == table[j][1]) {
        y = j;
        area1 = table[y][0];
        area2 = table[y + shift_y][0];
      }

    const a1 = table[y][x];
    const a2 = table[y][x + 1];
    const a3 = table[y + shift_y][x];
    const a4 = table[y + shift_y][x + 1];

    if (this.LD < 1.2) {  // when LD < 1.2, no unprotected openings are permitted
      return 0;

    } else if (this.LD == LD1 && this.area === area1) {
        return a1;

    } else if (this.LD == LD1 || this.LD > maxLD) {
        return ((this.area - area1) / (area2 - area1)) * (a3 - a1) + a1;

    } else if (this.area == area1 || this.area > maxArea){
        return ((this.LD - LD1) / (LD2 - LD1)) * (a2 - a1) + a1;

    } else {
        const temp1 = ((this.LD - LD1) / (LD2 - LD1)) * (a2 - a1) + a1;
        const temp2 = ((this.LD - LD1) / (LD2 - LD1)) * (a4 - a3) + a3;

        return ((this.area - area1) / (area2 - area1)) * (temp2 - temp1) + temp1;
    }
  }

  private minConstructionReq({ columnIndex }: { columnIndex: number; }): string {

    if (this.unprotectedOpenings >= 100) {
      return "None";
      
    } else {
        const limits = [10, 25, 50, 100];
        const isAreaLarger = (areaLimit: number) => this.unprotectedOpenings <= areaLimit;
        const i = limits.findIndex(isAreaLarger);

      if (this.hazard) {
        return constructionTable[i + 4][columnIndex];

      } else {
          return constructionTable[i][columnIndex];
      }
    }
  }

  get frr(): string {
    return this.minConstructionReq({ columnIndex: 0 });
  }

  get construction(): string {
    return this.minConstructionReq({ columnIndex: 1 });
  }

  get cladding(): string {
    return this.minConstructionReq({ columnIndex: 2 });
  }

}

export default Compartment;
