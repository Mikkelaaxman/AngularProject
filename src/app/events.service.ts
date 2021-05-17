import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Event } from './entities/Event';
import { AppState } from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }

  saveEvent(event: Event) {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-5a6b2-default-rtdb.firebaseio.com/events.json?auth=' + token;
  

    return this.http.post(url, event, this.getHttpOptions());
    // "https://<DATABASE_NAME>.firebaseio.com/users/ada/name.json?auth=<ID_TOKEN>"
  }


  readEvents() {
    const token = this.ngRedux.getState().users.token;
    const url = 'https://kvalifik-5a6b2-default-rtdb.firebaseio.com/events.json?auth=' + token;

    return this.http.get(url, this.getHttpOptions());
  }
}