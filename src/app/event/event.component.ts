import { Component, Input, OnInit } from '@angular/core';

import { EventEmitter, Output } from '@angular/core';
import { Event } from '../entities/Event';

//CHILD COMPONENT for events
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Output() eventClicked: EventEmitter<any> = new EventEmitter<any>(); //bubbles up to parent 

  constructor() { }

  ngOnInit(): void {
  }
  
  editEvent(id: string): void {
    this.eventClicked.emit(id); //bubbles
  }

}
