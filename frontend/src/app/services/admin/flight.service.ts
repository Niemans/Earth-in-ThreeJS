import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/Flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private url = "http://localhost:3000/admin";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    })
  }

  constructor (
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  getFlights(): Observable<Flight[]>{
    let url = "http://localhost:3000/flight";
    return this.http
      .get<Flight[]>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<Flight[]>("getPlaces", []))
      );
  }

  createFlight(flight:Flight): Observable<any>{
    let url = 'http://localhost:3000/flight';
    return this.http
      .post<Flight>(url, {sPID:flight.sPID, fPID:flight.fPID, time:flight.time}, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("createFlight"))
      );
  }

  updateFlight(flight:Flight){
    let url = `http://localhost:3000/flight/${flight.FID}`;
    return this.http
      .put<Flight>(url, {time:flight.time}, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("updateFlight"))
      );
  }

  deleteFlight(FID:Number){
    let url = `http://localhost:3000/flight/${FID}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("deleteFlight"))
      );
  }
}
