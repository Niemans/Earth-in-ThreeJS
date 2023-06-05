import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Router } from '@angular/router';
import { Comment as com } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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

  getComments(){
    let url = "http://localhost:3000/comment";
    return this.http
      .get<com[]>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<com[]>("getComments", []))
      );
  }

  getCommentUser(UID:number){
    let url = `http://localhost:3000/comment/user/${UID}`;
    return this.http
      .get<Comment>(url, {responseType: "json"})
      .pipe(
        catchError(this.errorHandlerService.handleError<com>("getCommentUser"))
      );
  }

  createComment(comment:com){
    let url = `http://localhost:3000/comment/${comment.UID}`;
    return this.http
      .put<com>(url, {title:comment.title, content: comment.content, FID: comment.FID, PID:comment.PID}, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("createComment"))
      );
  }

  updateComment(comment:com){
    let url = `http://localhost:3000/comment/${comment.UID}/${comment.CID}`;
    return this.http
      .put<com>(url, {title:comment.title, content: comment.content}, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("updateComment"))
      );
  }

  deleteComment(UID:number, CID:number){
    let url = `http://localhost:3000/comment/${UID}/${CID}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("deleteComment"))
      );
  }

  deleteCommentAdmin(CID:number){
    let url = `http://localhost:3000/comment/${CID}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(
        first(),
        catchError<any,Observable<any>>(this.errorHandlerService.handleError("deleteComment"))
      );
  }
}
