import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {first, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopulateService {
  constructor(private http: HttpClient) {
  }

  readTextFromPhoto(file: FormData): Observable<any> {
    return this.http.post('api/populate', file, {
      params: {
        lang: 'deu'
      },
      responseType: 'text'
    }).pipe(first());
  }
}
