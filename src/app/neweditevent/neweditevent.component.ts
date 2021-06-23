import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Event } from '../entities/Event';
import { EventActions } from '../store/actions/EventActions';
import { AppState } from '../store/Store';
import { DateTimeAdapter, OwlDateTimeComponent, OwlDateTimeModule } from 'ng-pick-datetime'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-neweditevent',
  templateUrl: './neweditevent.component.html',
  styleUrls: ['./neweditevent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewediteventComponent implements OnInit {
  public selectedEvent: Event;
  public eventForm: FormGroup;
  public headerTitle: String = 'Create New Event';
  public editMode: boolean = false;
  public dateTimeRange: Date[];
  public pinned: Event;
  public isPinned: Boolean = false;

  @Output() alertSend: EventEmitter<any> = new EventEmitter<any>(); //bubbles up to parent 

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, private router: Router, private eventActions: EventActions,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('myId');
    console.log(id);
    if (id !== null) {
      this.headerTitle = "Edit Event";
      this.editMode = true;
    }

    //Extract state from appstate and subscribe to changes to events
    this.ngRedux.select(state => state.events).subscribe(res => {
      this.selectedEvent = res.events.find(event => event.id === id); //find the event
      this.pinned = res.isPinned; //Get currently pinned event

    });
    //If theres no event found, we want to create new event instead
    if (this.selectedEvent === undefined) {
      this.selectedEvent = new Event();
    }
    // console.log(this.selectedPost);
    // if (this.selectedEvent.id == this.pinned.id) { this.isPinned = true }

    this.eventForm = this.fb.group({
      event: [this.selectedEvent.event, Validators.required],
      fromDate: [this.selectedEvent.fromDate, Validators.required],
      toDate: [this.selectedEvent.toDate, Validators.required],
      location: [this.selectedEvent.location, Validators.required],
      description: [this.selectedEvent.description],
      status: [this.selectedEvent.status, Validators.required],
      pinned: [this.isPinned]
    });
  }

  loadFile(event) {
    let output = document.getElementById('output');
    (<HTMLImageElement>output).src = URL.createObjectURL(event.target.files[0]);  //Have to cast html element to image element
    output.onload = function () {
      URL.revokeObjectURL((<HTMLImageElement>output).src) // free memory
    }
  };

  onSubmitEvent() {
    console.log(this.eventForm);
    console.log("FromDate: " + this.eventForm.value.dtRange2)

    if (this.eventForm.valid) {

      if (!this.editMode) {
        this.selectedEvent = this.eventForm.value;
        this.eventActions.addEvent(this.selectedEvent);
        if (this.eventForm.value.pinned) { this.setPinned(this.selectedEvent) } //IF eventform pinned slider is true notify isPinned of state change
        
        //Bubble up alert to events page
        this.alertEvent("Event Created Successfully")

      } else {

        this.selectedEvent.event = this.eventForm.value.event;
        this.selectedEvent.fromDate = this.eventForm.value.fromDate;
        this.selectedEvent.toDate = this.eventForm.value.toDate;
        this.selectedEvent.location = this.eventForm.value.location;
        this.selectedEvent.description = this.eventForm.value.description;
        this.selectedEvent.status = this.eventForm.value.status;

        if (this.eventForm.value.pinned) { this.setPinned(this.selectedEvent) } //IF eventform pinned slider is true notify isPinned of state change
        //TODO Or remove Pinned if it was true before

        try {
          this.eventActions.updateEvent(this.selectedEvent.id, this.selectedEvent);
          this.alertEvent("Event Updated Successfully")
        } catch (error) {
          //Will probably never happen
          this.alertEvent(error)
        }
      }

      this.router.navigate(['events']);
    }
    else {
      //TODO Wont be seen yet
      this.alertEvent("Please fill out all forms")
    }

  }

  onDeleteEvent() {
    let id: String = this.selectedEvent.id;
    if (id != null) {
      this.eventActions.deleteEvent(id);
      console.log("Event deleted with id:" + id)
      this.router.navigate(['events']);
    }
    else (console.log("Selected events id is null"))

  }

  setPinned(pinned: Event): void {
    this.eventActions.setPinned(pinned);
  }

  alertEvent(message: string): void {
    console.log("Message send from edit event: " + message)
    this.alertSend.emit(message); //bubbles
    //I should make an alert component instead
  }
}