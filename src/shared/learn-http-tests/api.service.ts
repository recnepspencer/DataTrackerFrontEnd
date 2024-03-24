import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TagInterface } from "./tag.interface";

@Injectable()
export class ApiService {
  httpClient = inject(HttpClient);
  apiURL = "http://localhost:3004";

  getTags(): Observable<TagInterface[]> {
    return this.httpClient.get<TagInterface[]>(`${this.apiURL}/tags`);
  }
  createTag(tag: string): Observable<TagInterface> {
    return this.httpClient.post<TagInterface>(`${this.apiURL}/tags`, { tag });
  }
}