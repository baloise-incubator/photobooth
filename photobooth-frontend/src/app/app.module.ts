import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BalButtonModule, BalCardModule, BalContentModule,
  BalCoreModule, BalFileUploadModule,
  BalFooterModule,
  BalHeadingModule, BalIconModule, BalNavbarModule, BalStackModule, BalStageModule, BalTextModule
} from "@baloise/design-system-components-angular";
import {HttpClientModule} from "@angular/common/http";
import { LandingComponent } from './src/landing/landing.component';
import { PopulateComponent } from './src/populate/populate.component';
import { FormComponent } from './src/form/form.component';
import {balIconDocument, balIconFile} from "@baloise/design-system-icons";
import { ValidateComponent } from './src/validate/validate.component';

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
        icons: { balIconFile , balIconDocument},
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
    BalTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
