import { Subject, Observable } from "rxjs";
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { HttpClient }  from "@angular/common/http";
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private port = "http://localhost:4201";
  constructor(private http: HttpClient, public router: Router, private cookies: CookieService) { } // if there is a problem with webcam image you should prob init webcam image here

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




  public changeSignUpMode(){
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
      const data = {
        webcamImage: webcamImage,
        username: this.username
      }
      this.http.post(this.port + '/create-user', JSON.parse(JSON.stringify(data)))    //Converting object to JSON and sending it to the server
      .subscribe(response => {
        const res = JSON.parse((JSON.stringify(response)))  //Converting object to JSON
        if(res.error) {
          console.log(res.error.message)
          this.showLoading = false;
          alert(res.error.message)
        }
        else {
          console.log(res.message)
          this.cookies.set("_id", res._id)
          this.showLoading = false;
          this.router.navigate(['posts-page']);

        }
      })
    }
    //login
    else{
      this.http.post(this.port + '/verify-user-face', webcamImage)
      .subscribe(response => {
        const user = JSON.parse((JSON.stringify(response)))  //Converting object to JSON
          if( user.id != null){
            console.log("we did ittt  ")
            this.cookies.set("_id", user.id)
            this.showLoading = false
            this.router.navigate(['posts-page']);
          }
          else{
            console.log("noo:(")
            this.buttonText = "Retake"
            this.showLoading = false
          }

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
