import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit{
  @Input()
  data: string | undefined;

  @Input()
  imageSrc: string | ArrayBuffer | null = '';

  @Input()
  percentMatch: number = 0;

  @Output()
  uploadDocument: EventEmitter<CustomEvent> = new EventEmitter<CustomEvent>();

  form?: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.buildForm();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(value => this.validateForm());
  }

  validateForm(): void {
    if(this.data?.indexOf(this.form?.get('firstName')?.value) != -1){
      this.percentMatch = 100;
      return;
    }
    this.percentMatch = 0;
  }

  buildForm(): FormGroup {
    return this.fb.group({
      firstName: this.fb.control(""),
      lastName: this.fb.control(""),
      postCode: this.fb.control(""),
      street: this.fb.control(""),
      city: this.fb.control(""),
      houseNumber: this.fb.control(""),
      policyNumber: this.fb.control(""),
    })
  }

}
