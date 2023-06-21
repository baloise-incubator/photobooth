import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {
  BalButtonModule,
  BalCardModule,
  BalContentModule,
  BalCoreModule,
  BalFieldModule,
  BalFileUploadModule,
  BalFooterModule,
  BalHeadingModule,
  BalIconModule,
  BalInputGroupModule,
  BalInputModule,
  BalInputSliderModule,
  BalNavbarModule,
  BalStackModule,
  BalStageModule,
  BalTextModule
} from "@baloise/design-system-components-angular";
import {balIconDocument, balIconFile} from "@baloise/design-system-icons";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormComponent} from './src/form/form.component';
import {LandingComponent} from './src/landing/landing.component';
import {PopulateComponent} from './src/populate/populate.component';
import {ValidateComponent} from './src/validate/validate.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PopulateComponent,
    FormComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BalCoreModule.forRoot({
      defaults: {
        icons: {balIconFile, balIconDocument},
      },
    }),
    BalCoreModule,
    BalFooterModule,
    BalButtonModule,
    BalHeadingModule,
    BalStageModule,
    BalNavbarModule,
    BalFileUploadModule,
    BalCardModule,
    BalStackModule,
    BalIconModule,
    BalContentModule,
    BalTextModule,
    BalInputSliderModule,
    BalFieldModule,
    BalInputModule,
    ReactiveFormsModule,
    BalInputGroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
