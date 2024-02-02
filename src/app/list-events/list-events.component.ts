import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { EventsService } from '../services/events.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  events: Event[]  =  []
  isLoading: boolean = true;
  searchQuery: string = '';
  filteredEvents: any[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventsService.getEvents().subscribe(
      ((events: any) => {
        this.events = events.events;
        console.log('Events:', this.events);
        this.isLoading = false;
      }),
      ((error: any) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      })
    );
  }
  

  deleteEvent(eventId: string): void {
    this.eventsService.deleteEvent(eventId).pipe(
      tap(() => {
        this.loadEvents();
      }),
      catchError((error: any) => {
        console.error('Error deleting event:', error);
        return of([]);
      })
    ).subscribe();

  }
  applySearchFilter(): void {
    // Filter events based on the search query
    this.filteredEvents = this.events.filter(event =>
      event.eventName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
  



