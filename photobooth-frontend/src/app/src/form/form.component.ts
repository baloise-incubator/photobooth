import {Component} from '@angular/core';
import {first, tap} from "rxjs";
import {BackendService} from "../service/backend.service";
import {DocLanguage} from "../doc-language";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  languages = DocLanguage;
  docLanguage: string | undefined;
  content: string | undefined;
  populate = false;


  constructor(private backendService: BackendService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  chooseLang(lang: string): void {
    this.docLanguage = lang;
  }

  ngOnInit(){
    this.populate = (this.route.snapshot.firstChild?.data as any).value === 'populate';
  }


  onBalFilesAdded(e: CustomEvent) {
    const formData = new FormData();
    formData.append('file', e.detail[0]);
    this.backendService.uploadDocument(
      formData,
      this.docLanguage,
      (this.route.snapshot.firstChild?.data as any).value)
      .pipe(
        first(),
        tap( // Log the result or error
          {
            next: (data) => console.log(data),
            error: (error) => console.log('odavde', error)
          }
        )).subscribe(data => this.content = data);
  }

  onBalRejectedFile(e: Event) {
    console.log(e)
  }
}
