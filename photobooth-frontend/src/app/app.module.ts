import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BalButtonModule,
  BalCoreModule,
  BalFooterModule,
  BalHeadingModule, BalNavbarModule, BalStageModule
} from "@baloise/design-system-components-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BalCoreModule.forRoot(),
    BalCoreModule,
    BalFooterModule,
    BalButtonModule,
    BalHeadingModule,
    BalStageModule,
    BalNavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
