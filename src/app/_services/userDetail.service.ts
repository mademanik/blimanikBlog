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
export class UserDetailService implements Resolve<any> {
  rows: any;
  private baseUrl = "http://localhost:8080";

  constructor(private _httpClient: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {}

  createUserDetail(data: any) {
    return this._httpClient.post<any>(`${this.baseUrl}/api/userDetail`, data);
  }

  getUserDetailById(userId: number) {
    return this._httpClient.get<any>(`${this.baseUrl}/api/userDetail/${userId}`);
  }

  updateUserDetailById(userId: number, data: any) {
    return this._httpClient.put<any>(
      `${this.baseUrl}/api/userDetail/${userId}`,
      data
    );
  }
}
