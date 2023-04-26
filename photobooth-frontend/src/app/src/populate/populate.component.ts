import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.scss']
})
export class PopulateComponent {

  @Input()
  data: string | undefined;

}
