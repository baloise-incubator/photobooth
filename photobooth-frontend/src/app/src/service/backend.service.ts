import {Injectable} from '@angular/core';
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

  uploadDocument(file: FormData, lang: string | undefined, endpoint : string): Observable<any> {
    return this.http.post(`api/${endpoint}`, file, {
      params: {
        lang: lang || 'deu'
      },
      responseType: 'text'
    });
  }

}
