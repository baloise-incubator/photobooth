import {Component} from '@angular/core';
import {first, tap} from "rxjs";
import {BackendService} from "../service/backend.service";
import {DocLanguage} from "../doc-language";
import {ActivatedRoute, Router} from "@angular/router";
import {BalToastService} from "@baloise/design-system-components-angular";

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
  isLoading = false;


  constructor(private backendService: BackendService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: BalToastService) {
  }

  chooseLang(lang: string): void {
    this.docLanguage = lang;
  }

  ngOnInit() {
    this.populate = (this.route.snapshot.firstChild?.data as any).value === 'populate';
  }


  onBalFilesAdded(e: CustomEvent) {
    const formData = new FormData();
    formData.append('file', e.detail[0]);
    this.isLoading = true;

    this.backendService.uploadDocument(
      formData,
      this.docLanguage,
      (this.route.snapshot.firstChild?.data as any).value)
      .pipe(
        first(),
      ).subscribe(
      data => this.content = data,
      err => this.toastr.create({
        closeHandler(): void {
        },
        duration: 0,
        message: err.message,
        color: 'danger'
      }),
      () => this.isLoading = false
    )

  }

  onBalRejectedFile(e: Event) {
    console.log(e)
  }
}
