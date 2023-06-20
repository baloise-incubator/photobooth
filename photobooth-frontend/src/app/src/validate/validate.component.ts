import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ValidationService} from "./validation.service";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {
  data: string[] = [];
  imageSrc: string | ArrayBuffer | null = '';
  percentMatch: number = 0;
  percentMatchByControl: [string, number, string][] = [];

  form?: FormGroup;

  constructor(private fb: FormBuilder, private validationService: ValidationService) {
  }

  ngOnInit() {
    this.form = this.buildForm();
    this.validateForm(this.form.value, []);
    this.form.valueChanges.pipe(debounceTime(500)).subscribe(value => this.validateForm(value, this.data));
  }

  validateForm(formValue: string, documentString: string[]): void {
    this.percentMatchByControl = this.validationService.matchFormValuesWithDocumentData(this.form?.value, documentString);
    this.percentMatch = this.percentMatchByControl.reduce((acc, current) => {
      return acc + current[1]
    }, 0) / 7;
  }

  onUploadDocument(event: CustomEvent) {
    const formData = new FormData();
    formData.append('file', event.detail[0]);
    const file = event.detail[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
    this.validationService.readTextFromPhoto(formData).subscribe(textData => {
      this.data = textData;
    });
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
    },)
  }

}
