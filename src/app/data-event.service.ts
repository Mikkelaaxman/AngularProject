import { Injectable } from '@angular/core';
import { Event} from './entities/Event'
@Injectable({
  providedIn: 'root'
})
export class DataEventService {
  private events: Event[] = []
  constructor() { }

  public getEvents() {
    return this.events;
  }

  public addEvent(event: Event) {
    // do something to add a new event
    this.events.push(event);
  }

  public deleteEvent(id: any) {
    // delete a event
  }
}