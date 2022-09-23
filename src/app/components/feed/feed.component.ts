import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { HttpClient }  from "@angular/common/http";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
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
  public buttonText:string = "Capture";

  //signup configurations
  public signUpMode:boolean = false;
  private username: string = "";



  
  public changeSighnUpMode(){
    this.signUpMode = !this.signUpMode;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.showLoading = true;
    //save image to database / compare image with database and reroute
    this.webcamImage = webcamImage;
    
    //signup
    if(this.signUpMode){
      // console.log(this.username);
      const data = JSON.stringify({
        webcamImage: this.webcamImage,
        username: this.username
      })
      this.http.post(this.port + '/create-user', data)
      .subscribe(response => {
        const user = JSON.parse((JSON.stringify(response)))  //Converting object to JSON
          if( user.id != null){
            console.log("we did ittt  " + user.id)
            
          }
          else{
            alert("something happened")
            console.log("couldnt capture")
          }
          this.showLoading = false;
      })
    }
    //login
    else{
      this.http.post(this.port + '/verify-user-face', webcamImage)
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
    
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  onInputChange(name: string): void {
    this.username = name;
  } 


  ngOnInit(): void {

  }

  // clickFunction() {
  //   style.filter = "blur(0px)";
  // }

}
