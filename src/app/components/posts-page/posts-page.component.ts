import {Component, OnInit, ViewChild} from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient }  from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  private port = "http://localhost:4201";
  constructor( private cookies: CookieService, public router: Router, private http: HttpClient) { }
  @ViewChild('content') inputElement: any;

  private content : string = "";
  public posts : [] | undefined;
  private userId = ""

  async post(content: string) {
    if(content != '') {
     await new Promise( resolve => {
        this.content = content;

        const data = {
          userId: this.cookies.get("_id"),
          content: this.content
        }
        this.http.post(this.port + '/new-post', JSON.parse(JSON.stringify(data)))
          .subscribe(response => {
            console.log(JSON.parse(JSON.stringify(response))["message"])
            resolve(response)
          })
      })
      this.inputElement.nativeElement.value = '';
      this.getAllPosts()
    }
  }

  ngOnInit(): void {
    this.userId =  this.cookies.get("_id")
    this.getAllPosts();
  }
  ngBeforeContentInit(): void {

  }

  private getAllPosts() {
    this.http.get(this.port + '/all-posts?userId=' + this.cookies.get("_id"))
      .subscribe(response => {
        this.posts = JSON.parse((JSON.stringify(response)))["posts"] // Converting object to JSON and then taking the posts from it.
      })
  }

  logout(){
    this.cookies.delete("_id")
    this.router.navigate(['']);
  }
}

