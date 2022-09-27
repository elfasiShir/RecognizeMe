import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  public EXAMPLE_POSTS = [
    {username: 'shir', post: 'hello'},
    {username: 'eliraz', post: 'whats up'},
    {username: 'shir', post: 'its meea'}, {username: 'shir', post: 'hello'},
    {username: 'eliraz', post: 'whats up'},
    {username: 'shir', post: 'its meea'}, {username: 'shir', post: 'hello'},
    {username: 'eliraz', post: 'whats up'},
    {username: 'shir', post: 'its meea'}, {username: 'shir', post: 'hello'},
    {username: 'eliraz', post: 'whats up'}
  ]
  constructor( private cookies: CookieService ) { }

  private userId = ""
  ngOnInit(): void {
    this.userId =  this.cookies.get("_id")
    alert("cookies from post page" + this.userId)
  }

}
