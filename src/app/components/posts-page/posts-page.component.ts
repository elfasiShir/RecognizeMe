import { Component, NgIterable, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient }  from "@angular/common/http";
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  private port = "http://localhost:4201";
  constructor( private cookies: CookieService, private http: HttpClient) { }
  private content : string = "";
  public posts : JSON[]| undefined;
  private userId = ""
  post(content: string) : void{
    this.content = content;
  }
  ngOnInit(): void {
    
  }
  ngBeforeContentInit(): void {
    this.userId =  this.cookies.get("_id")
    this.http.post(this.port + '/all-posts', this.userId)
    .subscribe(response => {
      
    })
  }

}
