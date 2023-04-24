import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient
  ) {

  }

  uploadDocument(file: File): Observable<any> {
    return this.http.post('api/upload', file);
  }


}
