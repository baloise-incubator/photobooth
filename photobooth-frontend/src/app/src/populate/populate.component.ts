import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {Keyword} from "../keyword";
import {Title} from "../title";

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.scss']
})
export class PopulateComponent {

  @Input()
  data: string | undefined;

  @Input()
  imageSrc: any;

  @Input()
  isLoading = false;

  loadingData = false;

  @Output()
  uploadDocument: EventEmitter<CustomEvent> = new EventEmitter<CustomEvent>();

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

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data) {
      this.loadingData = true;
      this.processData();
      this.loadingData = false;
    }
  }

  processData() {

    let result : any = {}
    let title = '';

    let cleared = (this.data as string).replaceAll('\n', ' ')

    console.log(Title.MRS)
    if(cleared.includes(Title.MS)){
      title = Title.MS;
    } else if(cleared.includes(Title.MRS)){
      title = Title.MRS;
    }

    let upper = cleared.substring(
      (this.data as string).indexOf(title), (this.data as string).lastIndexOf(title))
      .split(' ');
    let lower = cleared.substring((this.data as string)
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

    for(let key in result){
      if(this.formGroup.get(key)){
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


}
