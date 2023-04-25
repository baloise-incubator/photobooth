import {Component} from '@angular/core';
import {BackendService} from "./src/service/backend.service";
import {BalToastService} from "@baloise/design-system-components-angular";
import {first, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'photobooth-frontend';

  constructor(private backendService: BackendService,
              private toaster: BalToastService
  ) {
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
