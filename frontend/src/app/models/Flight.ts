import { Place } from "./Place";

export interface Flight {
  FID: number;
  sPID: number;
  start: Place;
  fPID:number;
  finish: Place;
  time: number;
}
