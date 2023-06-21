import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(private router: Router) {
  }

  onClick(path: string){
    console.log(path)
    this.router.navigate(['form', path], {queryParamsHandling : "merge"})
  }
}
