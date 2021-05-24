import { Injectable } from '@angular/core';
import { Event} from './entities/Event'
@Injectable({
  providedIn: 'root'
})
export class DataEventService {
  private events: Event[] = [
  {id: "1",event: "Roskilde",date: new Date(2021,2,3), location: "Roskilde", description: 'an event', status: "Draft", },
  {id: "2",event: "Tinderbox",date: new Date(2021,2,3), location: "Odense", description: 'an event', status: "Draft", },
  {id: "3",event: "SmukFest",date: new Date(2021,2,3), location: "Skanderborg", description: 'an event', status: "Draft", }
  ]

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