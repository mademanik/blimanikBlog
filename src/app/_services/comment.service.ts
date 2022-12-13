import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommentsService implements Resolve<any> {
  rows: any;
  private baseUrl = "http://localhost:8080";

  constructor(private _httpClient: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {}

  addComments(data: any) {
    return this._httpClient.post<any>(
      `http://localhost:8080/api/comments`,
      data
    );
  }

  getCommentsByBlogId(id: number) {
    return this._httpClient.get<any>(
      `http://localhost:8080/api/comments/${id}`
    );
  }
}
