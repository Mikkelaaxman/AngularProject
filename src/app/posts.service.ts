import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Post } from './entities/Post';
import { AppState } from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  savePost(post: Post) {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-5a6b2-default-rtdb.firebaseio.com/posts.json?auth=' + token;

    return this.http.post(url, post, this.getHttpOptions());
    // "https://<DATABASE_NAME>.firebaseio.com/users/ada/name.json?auth=<ID_TOKEN>"
  }


  readPosts() {
    const token = this.ngRedux.getState().users.token;
    console.log(token)
    const url = 'https://kvalifik-5a6b2-default-rtdb.firebaseio.com/posts.json?auth=' + token;

    return this.http.get(url, this.getHttpOptions());
  }
}
