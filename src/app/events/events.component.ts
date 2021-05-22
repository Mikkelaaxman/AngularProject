import { NgRedux } from '@angular-redux/store';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataEventService } from '../data-event.service'
import { Event } from '../entities/Event'
import { AppState } from '../store/Store';
import { EventActions } from '../store/actions/EventActions';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {

  public events: Event[];
  displayedColumns: string[] = ['date', 'name', 'location', 'status', 'edit'];
  @ViewChild('upcoming') upcomingTable: MatTable<Event>;
  @ViewChild('upcomingPaginator') upcomingPaginator: MatPaginator;

  dataSource = new MatTableDataSource<Event>();

  constructor(private router: Router, private tempDataEventService: DataEventService,
    private ngRedux: NgRedux<AppState>, private eventActions: EventActions) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.upcomingPaginator;
    this.length = this.events.length / this.pageSize; //Setting number of pages to match number of events
    console.log("AfterView init")
  }

  ngOnInit(): void {


    //We want to show a temp message until logged in
    //this.events = this.tempDataEventService.getEvents();

    this.eventActions.readEvents();

    this.ngRedux.select(state => state.events).subscribe(res => {
      this.events = res.events;
      this.dataSource = new MatTableDataSource<Event>(this.events);
    });

  
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //TODO this.events.filter = filterValue;
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