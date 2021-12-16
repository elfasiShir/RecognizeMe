import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebcamImage, WebcamModule} from "ngx-webcam";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  WebcamModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class AppModule { }
