import { Component } from '@angular/core';
import {first, tap} from "rxjs";
import {BackendService} from "../service/backend.service";
import {DocLanguage} from "../doc-language";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  languages = DocLanguage;
  docLanguage: string | undefined;

  constructor(private backendService: BackendService) {
    console.log(this.languages)
    setInterval(_=>console.log(this.docLanguage), 2000);
  }

  chooseLang(lang: string): void{
    this.docLanguage = lang;
  }



  onBalFilesAdded(e: CustomEvent) {
    const formData = new FormData();
    formData.append('file', e.detail[0]);
    this.backendService.uploadDocument(formData).pipe(first(),tap( // Log the result or error
      {
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      }
    )).subscribe(r=>console.log(r));
  }

  onBalRejectedFile(e: Event) {
    console.log(e)
  }
}
