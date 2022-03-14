import { Component, OnInit } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {WebcamImage, WebcamInitError} from 'ngx-webcam';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = true;

  //error
  public errors: WebcamInitError[] = [];

  // latest snapshot
  //! for required type (? for optional)
  public webcamImage: WebcamImage = null !;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    //save image to database / compare image with database and reroute
    this.webcamImage = webcamImage;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  constructor() { } // if there is a problem with webcam image you should prob init webcam image here

  ngOnInit(): void {
  }

}
