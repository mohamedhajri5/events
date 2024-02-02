import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../services/events.service'; // Import your event service
import { Event } from '../model/event';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id: string | null= ''; // Declare the id variable with the correct type and initialize it to an empty string
  event?: Event; // Replace with your event type

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) this.getEvent(this.id);
    });
  }

  getEvent(id: string) { // Update the type of the id parameter
    this.eventsService.getEventById(id).subscribe(event => this.event = event);
  }

  updateEvent() {
    if (!this.event) {
      return;
    }
    this.eventsService.updateEvent(this.event).pipe(
      tap(() => {
        // Handle successful update
      }),
      catchError((err) => {
        console.error('An error occurred:', err.message);
        return throwError(() => new Error('Something went wrong. Please try again later.'));
      })
    ).subscribe();
  }
}