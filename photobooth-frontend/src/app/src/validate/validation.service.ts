import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(private http: HttpClient) {}

  readTextFromPhoto(file: FormData): Observable<any>{
    return this.http.post('api/validate', file, {
      params: {
        lang: 'deu'
      },
      responseType: 'text'
    }).pipe(first());
  }
  matchFormValuesWithDocumentData(formValue: any, docWordArray: string[]): [string, number, string][]{
    let matchingPercentage: [string, number, string][] = [];
    for (const k in formValue) {
      const v = formValue[k];
      matchingPercentage.push([k,...this.findBestMatchingWord(docWordArray, v)]);
    }
    return matchingPercentage;
  }
  private matchStrings(string1: string, string2: string): [number, string]{
    const stringSimilarity = require("string-similarity");
    return string1 && string2 && stringSimilarity.compareTwoStrings(string1, string2) ? [stringSimilarity.compareTwoStrings(string1, string2), string2] : [0, ''];
  }

  private findBestMatchingWord(docWordArray: string[], formValue:string): [number, string] {
      return docWordArray.map(word=> {
       return this.matchStrings(formValue, word);
      }).sort((a,b)=>b[0]-a[0])[0];
  }

}
