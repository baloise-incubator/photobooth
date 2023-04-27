import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {}

  readTextFromPhoto(): string[]{
    return [
      "Basler",
      "Versicherung",
      "AG",
      "I",
      "Aeschengraben",
      "21",
      "",
      "Postfach",
      "BG",
      "S",
      "er",
      "4002",
      "Base",
      "",
      "Versicherungen",
      "Www",
      "baloise",
      "ch",
      "Kundenservice",
      "00800",
      "24",
      "800",
      "800",
      "kundenservice",
      "baloise",
      "ch",
      "Herr",
      "Adrian",
      "Alioski",
      "Petersgasse",
      "32",
      "4051",
      "Basel",
      "23",
      "",
      "November",
      "2021",
      "Sehr",
      "geehrter",
      "Herr",
      "Alioski",
      "Schön",
      "",
      "dass",
      "Sie",
      "zum",
      "Kreis",
      "unserer",
      "Kunden",
      "gehören",
      "",
      "Sie",
      "erhalten",
      "mit",
      "diesem",
      "Schreiben",
      "Ihren",
      "Versicherungsvertrag",
      "",
      "Versicherungsvertrag",
      "für",
      "Landwirtschaftsversicherung",
      "Versicherungsvertrag",
      "70",
      "2",
      "861",
      "042",
      "Vertragsbeginn",
      "23",
      "11",
      "2021",
      "Bitte",
      "schauen",
      "Sie",
      "sich",
      "den",
      "Inhalt",
      "in",
      "Ruhe",
      "an",
      "",
      "Gibt",
      "es",
      "weitere",
      "Änderungen",
      "",
      "Dann",
      "melden",
      "Sie",
      "uns",
      "diese",
      "bitte",
      "in",
      "den",
      "nächsten",
      "vier",
      "Wochen",
      "",
      "Wir",
      "danken",
      "Ihnen",
      "für",
      "das",
      "uns",
      "geschenkte",
      "Vertrauen",
      "",
      "Falls",
      "Sie",
      "Fragen",
      "haben",
      "",
      "zögern",
      "Sie",
      "nicht",
      "uns",
      "anzurufen",
      "",
      "Freundliche",
      "Grüsse",
      "Basler",
      "Versicherung",
      "AG",
      "",
      "",
      "",
      "z",
      "",
      "",
      "a"
    ];
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
