import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FeedComponent } from './components/feed/feed.component';
import { WebcamModule } from "ngx-webcam";
import { CookieService} from "ngx-cookie-service";

import { HttpClientModule } from '@angular/common/http';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostComponent } from './components/posts-page/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeedComponent,
    PostsPageComponent,
    PostComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        WebcamModule,
        HttpClientModule,
        RouterModule.forRoot([
          {path: 'login', component: FeedComponent  },
          {path: 'posts-page', component: PostsPageComponent},
          {path: '', redirectTo: '/login', pathMatch: 'full'},
          {path: '**', component: FeedComponent}
        ]),
    ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
