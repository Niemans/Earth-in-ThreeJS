import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  getUsers(): Observable<User[]> {
    let url = "http://localhost:3000/auth/user";
    return this.http
      .get<User[]>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<User[]>("getUsers", []))
      );
  }

  deleteUser(UID:number): Observable<any> {
    let url = `http://localhost:3000/auth/user/${UID}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("deleteUser"))
      );
  }

}
