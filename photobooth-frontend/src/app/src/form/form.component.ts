import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BalToastService} from "@baloise/design-system-components-angular";
import {DocLanguage} from "../doc-language";
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  languages = DocLanguage;
  docLanguage: string | undefined;
  populate = false;
  isLoading = false;
  imageSrc: string | ArrayBuffer | null = '';


  constructor(private backendService: BackendService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: BalToastService) {
  }

  ngOnInit() {
    this.populate = (this.route.snapshot.firstChild?.data as any).value === 'populate';
  }
}
