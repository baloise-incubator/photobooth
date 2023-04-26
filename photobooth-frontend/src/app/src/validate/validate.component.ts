import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent {
  @Input()
  data: string | undefined;

  @Input()
  imageSrc: any;

  @Input()
  percentMatch: number = 45;

  @Output()
  uploadDocument: EventEmitter<CustomEvent> = new EventEmitter<CustomEvent>();

}
