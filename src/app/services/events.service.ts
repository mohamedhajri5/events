import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  // Get all events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  // Get a single event by ID
  getEventById(id: string): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url);
  }

  // Update an existing event
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.apiUrl}/${event._id}`;
    return this.http.put<Event>(url, event);
  }

  // Delete an event by ID
  deleteEvent(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
