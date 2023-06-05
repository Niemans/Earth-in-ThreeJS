import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { Flight } from 'src/app/models/Flight';
import { Place } from 'src/app/models/Place';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';
import { Comment as Com } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class InformationsService {

  flight!: BehaviorSubject<Flight>;
  flightComments!: BehaviorSubject<Com[]>;
  placeComments!: BehaviorSubject<Com[]>;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    this.flight = new BehaviorSubject<Flight>({} as Flight);
    this.flightComments = new BehaviorSubject<Com[]>([]);
    this.placeComments = new BehaviorSubject<Com[]>([]);
  }

  findComments(start:Place, finish:Place){
    this.getFlight(start.PID,finish.PID);
  }

  private getFlight(sPID: number, fPID:number){
    let url = `http://localhost:3000/flight/${sPID}/${fPID}`;
    this.http
      .get<Flight>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<Flight>("getPlace", {} as Flight))
      ).subscribe(f => {
        this.flight.next(f);
        this.getFlightComments();
        this.getPlaceComments();
      });
  }

  private getFlightComments(){
    let fid = this.flight.getValue().FID;

    let url = `http://localhost:3000/comment/flight/${fid}`;
    this.http
      .get<Com[]>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<Com[]>("getFlightComments", []))
      ).subscribe(c => {
        this.flightComments.next(c);
      });
  }

  private getPlaceComments(){
    let pid = this.flight.getValue().fPID;
    let url = `http://localhost:3000/comment/place/${pid}`;
    this.http
      .get<Com[]>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<Com[]>("getPlaceComments", []))
      ).subscribe(c => {
        this.placeComments.next(c);
      });
  }
}
