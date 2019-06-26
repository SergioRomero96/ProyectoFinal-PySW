import { Geometry } from './geometry';
export class Results {
  geometry: Geometry;
  constructor(geometry?: Geometry){
    this.geometry = geometry;
  }
}
