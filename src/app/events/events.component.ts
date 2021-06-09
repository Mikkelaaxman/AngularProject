import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataEventService } from '../data-event.service'
import { Event } from '../entities/Event'
import { AppState, UserState } from '../store/Store';
import { EventActions } from '../store/actions/EventActions';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { usersReducer } from '../store/reducers/UserReducer';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: Event[];
  displayedColumns: string[] = ['date', 'name', 'location','description', 'status', 'edit'];
  @ViewChild('upcoming') upcomingTable: MatTable<Event>;
  @ViewChild('upcomingPaginator') upcomingPaginator: MatPaginator;
  @ViewChild('newEventBtn') newEventBtn: MatButton;

  dataSource = new MatTableDataSource<Event>();

  constructor(private router: Router, private tempDataEventService: DataEventService,
    private ngRedux: NgRedux<AppState>, private eventActions: EventActions) { }

  ngOnInit(): void {

    this.eventActions.readEvents();

    
    this.ngRedux.select(state => state.events).subscribe(res => {
     

      this.events = res.events; //sets events array to response 

      if (this.events.length > 0) { //If there exists events  
        this.dataSource = new MatTableDataSource<Event>(this.events); //creates datasource for table with events array
        this.newEventBtn.disabled = false;  //Unlocks the ability to create new events. TODO Should maybe be tied to an actual LOGGED_IN 

         //add paginator to the datasource 
        this.dataSource.paginator = this.upcomingPaginator;

        this.length = this.dataSource.paginator.getNumberOfPages(); //Setting number of pages to match number of events

    }
      
      
      //if(UserState.LOGGED_IN ... )
    });



  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  editEvent(id: any) {
    this.router.navigate(['neweditevent', { myId: id }])
  }


}