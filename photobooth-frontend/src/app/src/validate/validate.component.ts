import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ValidationService} from "./validation.service";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit{
  @Input()
  data: string[] = [];

  @Input()
  imageSrc: string | ArrayBuffer | null = '';

  @Input()
  percentMatch: number = 0;

  @Input()
  percentMatchByControl: [string, number, string][] = [];

  @Output()
  uploadDocument: EventEmitter<CustomEvent> = new EventEmitter<CustomEvent>();

  form?: FormGroup;

  constructor(private fb: FormBuilder, private validationService: ValidationService) {
    this.data = this.validationService.readTextFromPhoto();
  }

  ngOnInit() {
    this.form = this.buildForm();
    this.form.disable();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(value => this.validateForm(value, this.data!));
  }

  validateForm(formValue: string, documentString: string[]): void {
    this.percentMatchByControl = this.validationService.matchFormValuesWithDocumentData(this.form?.value, documentString);
    this.percentMatch = this.percentMatchByControl.reduce((acc, current)=>{return acc+current[1]}, 0) /7;
  }

  onUploadDocument(event: CustomEvent){
    this.form?.enable();
    this.uploadDocument.emit(event);
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
    }, )
  }

}
