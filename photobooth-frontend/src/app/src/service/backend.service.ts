import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient
  ) {

  }

  uploadDocument(file: FormData, lang: string | undefined, endpoint: string): Observable<any> {
    return of('BaslerVersicherungAGIAeschengraben21,PostfachBG|Ser4002Base|VersicherungenWww.baloise.chKundenservice0080024800800kundenservice@baloise.chHerrAdrianAlioskiPetersgasse324051Basel23,November2021SehrgeehrterHerrAlioskiSchön,dassSiezumKreisunsererKundengehören.SieerhaltenmitdiesemSchreibenIhrenVersicherungsvertrag,VersicherungsvertragfürLandwirtschaftsversicherungVersicherungsvertrag70/2.861.042Vertragsbeginn23.11.2021BitteschauenSiesichdenInhaltinRuhean.GibtesweitereÄnderungen?DannmeldenSieunsdiesebitteindennächstenvierWochen,WirdankenIhnenfürdasunsgeschenkteVertrauen,FallsSieFragenhaben,zögernSienichtunsanzurufen.FreundlicheGrüsseBaslerVersicherungAG,z|a');
  }
}
