import { Component, OnInit } from '@angular/core';


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
  constructor() { }

  ngOnInit(): void {
  }

}
