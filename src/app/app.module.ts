import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FeedComponent } from './components/feed/feed.component';
import { ButtonComponent } from './components/button/button.component';
import {WebcamModule} from "ngx-webcam";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeedComponent,
    ButtonComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        WebcamModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
