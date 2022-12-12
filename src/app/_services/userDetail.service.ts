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
    return this._httpClient.get<any>(
      `${this.baseUrl}/api/userDetail/${userId}`
    );
  }

  updateUserDetailById(userId: number, data: any) {
    return this._httpClient.put<any>(
      `${this.baseUrl}/api/userDetail/${userId}`,
      data
    );
  }

  updateUserById(userId: number, data: any) {
    return this._httpClient.put<any>(
      `${this.baseUrl}/api/userDetail/user/${userId}`,
      data
    );
  }

  updateUserPasswordById(userId: number, data: any) {
    return this._httpClient.put<any>(
      `${this.baseUrl}/api/userDetail/password/${userId}`,
      data
    );
  }

  getDefaultAvatar() {
    return this._httpClient.get<any>(`${this.baseUrl}/files/avatar/avatar.jpg`);
  }

  removeAvatarFile(filename: string) {
    this._httpClient
      .delete("http://localhost:8080/files/avatar/" + filename)
      .subscribe((data) => {
        console.log(data);
      });
  }

  uploadAvatar(file: File, oriName: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append("file", file, oriName);

    const req = new HttpRequest(
      "POST",
      `${this.baseUrl}/uploadAvatar`,
      formData,
      {
        reportProgress: true,
        responseType: "json",
      }
    );

    return this._httpClient.request(req);
  }
}
