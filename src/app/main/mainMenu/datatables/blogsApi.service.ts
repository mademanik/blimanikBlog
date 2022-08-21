import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BlogsApiService {
  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<any>(`http://localhost:3000/blogs`);
  }

  getBlogsById(id: number) {
    return this.http.get<any>(`http://localhost:3000/blogs/${id}`);
  }

  postBlogs(data: any) {
    return this.http.post<any>(`http://localhost:3000/blogs`, data);
  }

  putBlogs(id: number, data: any) {
    return this.http.put<any>(`http://localhost:3000/blogs/${id}`, data);
  }

  deleteBlogs(id: number) {
    return this.http.delete<any>(`http://localhost:3000/blogs/${id}`);
  }
}
