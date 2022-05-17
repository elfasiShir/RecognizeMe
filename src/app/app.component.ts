import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecognizeMe';
  messages = this.http.get<any[]>('http://localhost:4201');

  constructor(private http : HttpClient) {
  }
}
