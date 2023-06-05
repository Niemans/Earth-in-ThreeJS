import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

import { Router } from '@angular/router';
import { Place } from 'src/app/models/Place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
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

  getPlaces(): Observable<Place[]> {
    let url = "http://localhost:3000/place";
    return this.http
      .get<Place[]>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<Place[]>("getPlaces", []))
      );
  }

  deletePlace(PID:number): Observable<any> {
    let url = `http://localhost:3000/place/${PID}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("deletePlace"))
      );
  }

  createPlace(place:Place): Observable<any>{
    let url = 'http://localhost:3000/place';
    return this.http
      .post<Place>(url, {name:place.name, latitude:place.latitude, longitude:place.longitude}, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("updatePlace"))
      );
  }
}
