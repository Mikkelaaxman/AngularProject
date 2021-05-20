import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { Event } from 'src/app/entities/Event';
import { EventsService } from 'src/app/events.service';

@Injectable({ providedIn: 'root'})
export class EventActions {

    constructor (private ngRedux: NgRedux<AppState>, private eventsService: EventsService)
    {}

  static ADD_EVENT: string = 'ADD_EVENT';
  static UPDATE_EVENT: string = 'UPDATE_EVENT';
  static READ_EVENTS: string = 'READ_EVENTS';
  static DELETE_EVENT: string = 'DELETE_EVENT';

  readEvents() {
    this.eventsService.readEvents().subscribe((result: any) => {
      console.log("result from server");
      console.log(result);

      let events: Event[] = [];
      for(let id in result) {
        let eventObj = result[id];
        eventObj.id = id;
        
        events.push(eventObj as Event);
      }

      this.ngRedux.dispatch({
        type: EventActions.READ_EVENTS,
        payload: events
      });
    });
  }

  addEvent(newEvent: Event) : void {

    this.eventsService.saveEvent(newEvent).subscribe((result: any) => {
      console.log("result from saving");
      console.log(result);

      newEvent.id = result.name;

      this.ngRedux.dispatch({
        type: EventActions.ADD_EVENT,
        payload: newEvent
      });
    });


  }
  updateEvent(id: String, updatedEvent: Event) : void {
    this.eventsService.updateEvent(id, updatedEvent).subscribe((result: any) => {
      console.log("Updating event: " + updatedEvent.event)
    })
    this.ngRedux.dispatch({
        type: EventActions.UPDATE_EVENT,
        payload: updatedEvent
    });
  }

  deleteEvent(id: String): void {

    this.eventsService.deleteEvent(id).subscribe((result: any) => {
      console.log("result from deleting");
      console.log(result);
    });
    this.ngRedux.dispatch({
      type: EventActions.DELETE_EVENT,
      payload: id
    });
  }

}