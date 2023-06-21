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

}
