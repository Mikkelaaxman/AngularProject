import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Event } from '../entities/Event';
import { EventActions } from '../store/actions/EventActions';
import { AppState } from '../store/Store';
import { DateTimeAdapter, OwlDateTimeComponent, OwlDateTimeModule } from 'ng-pick-datetime'


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


  constructor(private route: ActivatedRoute, private tempDataService: DataService,
    private fb: FormBuilder, private router: Router, private eventActions: EventActions,
    private ngRedux: NgRedux<AppState>) { }

    ngOnInit(): void {
      const id: string = this.route.snapshot.paramMap.get('myId');
      console.log(id);
      if (id !== null) {
        this.headerTitle = "Edit Event";
        this.editMode = true;
      }
      
      // this.selectedPost = this.tempDataService.getPosts().find(post => post.id === id);
      this.ngRedux.select(state => state.events).subscribe(res => {
        this.selectedEvent = res.events.find(event => event.id === id);
        // console.log("found");
        // console.log(this.selectedPost);
      });
      if (this.selectedEvent === undefined) {
        this.selectedEvent = new Event();
      }
      // console.log(this.selectedPost);
      
  
      this.eventForm = this.fb.group({
        event: [this.selectedEvent.event, Validators.required],
        date: [this.selectedEvent.date, Validators.required],
        location: [this.selectedEvent.location, Validators.required],
        description: [this.selectedEvent.description, Validators.required],
        status: [this.selectedEvent.status, Validators.required]

      });
    }
  
    onSubmitEvent() {
      console.log(this.eventForm);
      
      if (this.eventForm.valid){
        
        // Can you store this post object in the temp. data service 
        // and then navigate to the posts component?
        if (!this.editMode) {
          this.selectedEvent = this.eventForm.value;
          //this.selectedEvent.date = new Date(); giver todays date
          // this.selectedPost.id = ""+Math.random(); // temporary until we connect to a backend.
    
          // console.log(this.selectedPost);
          
          this.eventActions.addEvent(this.selectedEvent);
        } else {
          // console.log("call update");
          // console.log(this.selectedPost);
          // console.log(this.postForm.value);
          
          this.selectedEvent.event = this.eventForm.value.event;
          this.selectedEvent.date = this.eventForm.value.date;
          this.selectedEvent.location = this.eventForm.value.location;
          this.selectedEvent.description = this.eventForm.value.description;
          this.selectedEvent.status = this.eventForm.value.status;
         
          
          this.eventActions.updateEvent(this.selectedEvent.id, this.selectedEvent);
        }

        this.router.navigate(['events']);
      }
     
    }

    onDeleteEvent(){
      let id: String = this.selectedEvent.id;
      if (id != null) {
          this.eventActions.deleteEvent(id);
          console.log("Event deleted with id:" + id)
          this.router.navigate(['events']);
        }
      else (console.log("Selected events id is null"))
        
      }
  }