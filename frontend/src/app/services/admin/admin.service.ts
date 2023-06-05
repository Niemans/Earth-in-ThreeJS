import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, catchError, first, tap } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Place } from 'src/app/models/Place';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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

}
