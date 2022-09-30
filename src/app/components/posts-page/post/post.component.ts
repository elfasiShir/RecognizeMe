import { Component, Input, OnInit } from '@angular/core';
import { HttpClient }  from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {
  private port = "http://localhost:4201";

  _id = "";
  user_id = "";
  username = "";
  content = "";
  likes: string[] = [];
  comments = [];

  @Input()
  post!: {
    _id: string;
    user_id: string;
    username: string;
    content: string;
    likes: string[];
    comments: any;
  };

  doILikeThePost = false;
  myId!: string ;

  constructor( private http: HttpClient, private cookies: CookieService ) { }

  likeOrUnlike() {
    const data = {
      userId: this.myId,
      postId: this._id
    }
    if (this.doILikeThePost) {
      console.log("unlike")
      this.http.patch(this.port + '/unlike-post', JSON.parse(JSON.stringify(data)))
        .subscribe(res => {
          this.likes = this.likes.filter( userId => { return userId != this.myId })
        })
    } else {
      console.log("like")
      this.http.patch(this.port + '/like-post', JSON.parse(JSON.stringify(data)))
        .subscribe(res => {
          this.likes.push( this.myId )
        })
    }
    this.doILikeThePost = !this.doILikeThePost;

  }

  ngOnInit(): void {
    this._id = this.post._id
    this.user_id = this.post.user_id
    this.username = this.post.username
    this.content = this.post.content
    this.likes = this.post.likes
    this.comments = this.post.comments

    this.myId = this.cookies.get("_id");

    // @ts-ignore
    if( this.likes.includes(this.myId) ){
      this.doILikeThePost = true
    }
  }



}
