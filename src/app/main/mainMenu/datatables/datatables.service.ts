import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DatatablesService implements Resolve<any> {
  rows: any;
  onDatatablessChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.onDatatablessChanged = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`http://localhost:8080/api/blogs/`)
        .subscribe((response: any) => {
          this.rows = response;
          this.onDatatablessChanged.next(this.rows);
          resolve(this.rows);
        }, reject);
    });
  }

  deleteDataBlog(id: number) {
    return this._httpClient.delete<any>(`http://localhost:8080/api/blogs/${id}`);
  }

  getDataBlogs() {
    return this._httpClient.get<any>(`http://localhost:8080/api/blogs`);
  }

  addBlogs(data: any) {
    return this._httpClient.post<any>(`http://localhost:8080/api/blogs`, data);
  }

  getBlogById(id: number) {
    return this._httpClient.get<any>(`http://localhost:8080/api/blogs/${id}`);
  }

  updateBlog(id: number, data: any) {
    return this._httpClient.put<any>(`http://localhost:8080/api/blogs/${id}`, data);
  }
}
