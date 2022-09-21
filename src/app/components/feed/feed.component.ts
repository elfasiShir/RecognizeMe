import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { HttpClient }  from "@angular/common/http";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private port = "http://localhost:4201";
  constructor(private http: HttpClient) { } // if there is a problem with webcam image you should prob init webcam image here

  // toggle webcam on/off
  public showWebcam = true;

  //error
  public errors: WebcamInitError[] = [];

  // latest snapshot
  //! for required type (? for optional)
  public webcamImage: WebcamImage = null !;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  //button configurations
  public showLoading:boolean = false;
  public buttonText:string = "Capture"


  public triggerSnapshot(): void {
    //post to http here!!!!
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.showLoading = true;
    //save image to database / compare image with database and reroute
    this.webcamImage = webcamImage;
    this.http.post(this.port + '/verify-user-face', webcamImage)
    // this.http.post(this.port + '/create-user', webcamImage)
      .subscribe(response => {
        const user = JSON.parse((JSON.stringify(response)))  //Converting object to JSON
          if( user.id != null){
            console.log("we did ittt  " + user.id)
          }
          else{
            console.log("noo:(")
          }
          this.buttonText = "Retake"
          this.showLoading = false
      })
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  ngOnInit(): void {

  }

  // clickFunction() {
  //   style.filter = "blur(0px)";
  // }

}
