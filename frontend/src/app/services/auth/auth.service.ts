import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, catchError, first, tap } from 'rxjs';

import { User } from '../../models/User';
import { ErrorHandlerService } from '../error-handler/error-handler.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://localhost:3000/auth";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);
  UID!: Pick<User, "UID">;

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

  signup(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("signup")
      ));
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{token: string, UID: Pick<User, "UID">}> {
    return this.http
      .post <{token: string, UID: Pick<User, "UID">}>
        (`${this.url}/login`, {email, password}, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: {token: string, UID: Pick<User, "UID">}) => {
            this.UID = tokenObject.UID;
            localStorage.setItem("token", tokenObject.token);

            this.isUserLoggedIn$.next(true);
            this.checkType().subscribe(t => {
              this.isAdmin$.next(t);
            });

            this.router.navigate([""]);
        }),
        catchError(this.errorHandlerService.handleError<{token: string, UID: Pick<User, "UID">}>("login"))
      );
  }

  checkType() {
    return this.http.get<boolean>(`${this.url}/check`)
    .pipe(
      catchError(this.errorHandlerService.handleError<boolean>("login"))
    );
  }
}
