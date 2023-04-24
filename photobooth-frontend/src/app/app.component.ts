import {Component} from '@angular/core';
import {BackendService} from "./src/service/backend.service";
import {BalToastService} from "@baloise/design-system-components-angular";

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
    this.backendService.uploadDocument(e.detail[0]).subscribe(
      (e) => {
        console.log(e)
      },
      (e) => {
        this.toaster.create({
          message: `Error : ${e.message}`,
          color: "danger",
          duration: 5000
        })
      }
    )
    console.log(e)
  }

  onBalRejectedFile(e: Event) {
    console.log(e)
  }
}
