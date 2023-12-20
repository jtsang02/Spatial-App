import { tableB, tableC, tableD, tableE, constructionTable } from "./tables";

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

    public constructor(h: number, w: number, LD: number, actOpns: number, sprk: boolean, group: string) {
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
  
    private getParameters(): any {
      
    }

    /**
     * Calculates the percentage of openings in relation to the total area of the compartment.
     * @returns The percentage of openings.
     */
    get areaOfOpenings(): number {
      return this.actOpns ? (this.actOpns / this.area) * 100 : 0;
    }
  
    get unprotectedOpenings(): number {
      
      var LD1: number, LD2: number, area1: number, area2: number;
      var x: number, y: number, z: number, shift_y: number;
  
      if (this.sprk) {
        shift_y = 1;
        z = 0;
  
        if (this.hazard) {
          let table: number[][] = tableE;
          let maxLD: number = 15;
          let maxArea: number = 200;
        } else {
          let table: number[][] = tableD;
          let maxLD : number = 9;
          let maxArea: number = 150;
        }

      } else {
        shift_y = 3;
        z = this.ratioCode();
        let maxArea: number = 2000;
  
        if (this.hazard) {
          let table: number[][] = tableC;
          let maxLD: number = 70;
        } else {
          let table: number[][] = tableB;
          let maxLD: number = 50;
        }

      }
  
      const isLDlarger = (element: number) => element > this.LD;
      x = table[0].findIndex(isLDlarger) - 1;
      LD1 = table[0][x];
      LD2 = table[0][x + 1];
  
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
  
      if (this.LD < 1.2) return 0;
      else if (this.LD == LD1 && this.area == area1) return a1;
      else if (this.LD == LD1 || this.LD > maxLD)
        return ((this.area - area1) / (area2 - area1)) * (a3 - a1) + a1;
      else if (this.area == area1 || this.area > maxArea)
        return ((this.LD - LD1) / (LD2 - LD1)) * (a2 - a1) + a1;
      else {
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
  

  // Example usage
  // const compartment = new Compartment(10, 5, 2, 30, true, "E");
  // console.log(compartment.unprotectedOpenings);
  // console.log(compartment.frr);
  // console.log(compartment.construction);
  // console.log(compartment.cladding);
  