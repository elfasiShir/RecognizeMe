import { Component, Input, OnInit } from '@angular/core';
import { HttpClient }  from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  private port = "http://localhost:4201";
  
  @Input() username = "";
  @Input() content = "";
  @Input() likes = "";
  @Input() _id = "";
  @Input() _user_id = "";
  constructor(private http: HttpClient) { }
  
  like(){
  }

  ngOnInit(): void {
  }

  

}
