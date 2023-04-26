import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./src/landing/landing.component";
import {PopulateComponent} from "./src/populate/populate.component";
import {FormComponent} from "./src/form/form.component";
import {ValidateComponent} from "./src/validate/validate.component";

const routes: Routes = [
  {path: "", component: LandingComponent},
  {
    path: "form", component: FormComponent,
    children: [
      {path: "validate", component: ValidateComponent},
      {path: "populate", component: PopulateComponent}
    ]
  },
  {path: "**", redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
