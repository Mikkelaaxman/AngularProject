import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataEventService} from '../data-event.service'
import {Event} from '../entities/Event'
import { AppState } from '../store/Store';
import { EventActions } from '../store/actions/EventActions';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  event = 'Festival';

  public events: Event[];


  constructor(private router: Router, private tempDataEventService: DataEventService,
    private ngRedux: NgRedux<AppState>, private eventActions: EventActions) { }



  ngOnInit(): void {
    this.eventActions.readEvents();

    this.ngRedux.select(state => state.events).subscribe(res => {
      this.events = res.events;
    });

  }

}