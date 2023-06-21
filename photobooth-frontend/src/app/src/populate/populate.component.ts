import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Keyword} from "../keyword";
import {Title} from "../title";
import {PopulateService} from './populate.service';

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.scss']
})
export class PopulateComponent {

  data: string | undefined;

  @Input()
  imageSrc: any;

  loadingData = false;

  formGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    houseNumber: new FormControl(),
    zip: new FormControl(),
    product: new FormControl(),
    policyNo: new FormControl(),
  });

  constructor(private populateService: PopulateService) {
  }

  processData(data: any) {

    let result: any = {}
    let title = '';

    let cleared = (data as string).replaceAll('\n', ' ')

    console.log(Title.MRS)
    if (cleared.includes(Title.MS)) {
      title = Title.MS;
    } else if (cleared.includes(Title.MRS)) {
      title = Title.MRS;
    }

    let upper = cleared.substring(
      (data as string).indexOf(title), (data as string).lastIndexOf(title))
      .split(' ');
    let lower = cleared.substring((data as string)
      .lastIndexOf(title))
      .split(' ')
      .slice(1, 3);

    console.log(upper, lower);

    const lastNameParts = upper.filter(value => lower.includes(value));

    console.log(lastNameParts, this.concatinate(lastNameParts), lower[0])


    result.lastName = this.concatinate(lastNameParts);
    result.firstName = this.concatinate(upper.slice(1, upper.indexOf(lower[0])));

    let lastNameIndex = upper.indexOf(lastNameParts[lastNameParts.length - 1])

    result.street = upper[++lastNameIndex];
    result.houseNumber = upper[++lastNameIndex];
    result.zip = upper[++lastNameIndex];
    result.city = upper[++lastNameIndex];

    let wordArray = cleared.split(' ');


    result.policyNo = wordArray[wordArray.lastIndexOf(Keyword.POLICY_NO) + 1]
    result.product = wordArray[wordArray.indexOf(Keyword.POLICY_NO) + 2]

    console.log(
      Keyword.POLICY_NO,
      wordArray,
      wordArray.lastIndexOf(Keyword.POLICY_NO),
      wordArray[wordArray.lastIndexOf(Keyword.POLICY_NO) + 1]
    )

    for (let key in result) {
      if (this.formGroup.get(key)) {
        this.formGroup.get(key)?.patchValue(result[key])
      }
    }
  }

  concatinate(arr: string[]): string {
    let ret = '';

    for (let s of arr) {
      s ? ret = ret + ' ' + s : null;
    }

    return ret.trim();
  }

  onUploadDocument(event: CustomEvent) {
    const formData = new FormData();
    formData.append('file', event.detail[0]);
    const file = event.detail[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
    this.populateService.readTextFromPhoto(formData).subscribe(textData => {
      this.loadingData = true;
      this.processData(textData);
      this.loadingData = false;
    });
  }


}
