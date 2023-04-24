import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BalButtonModule,
  BalCoreModule, BalFileUploadModule,
  BalFooterModule,
  BalHeadingModule, BalNavbarModule, BalStageModule
} from "@baloise/design-system-components-angular";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BalCoreModule.forRoot(),
    BalCoreModule,
    BalFooterModule,
    BalButtonModule,
    BalHeadingModule,
    BalStageModule,
    BalNavbarModule,
    BalFileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
