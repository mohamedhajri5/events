import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.css']
})
export class EventCreationComponent implements OnInit {
  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {}
  eventForm: FormGroup =  new FormGroup({
    description: new FormControl(''),
    location: new FormControl(''),
    price: new FormControl(''),
    imageUrl: new FormControl(''),
    capacity: new FormControl(''),
    id: new FormControl(''),
    eventName: new FormControl('', Validators.required),
    cover: new FormControl(''),
    startDate: new FormControl(''),
    startTime: new FormControl(''),
    type: new FormControl('', Validators.required),
    universityLocation: new FormControl(''),
    state: new FormControl(''),
    placeName: new FormControl(''),
    locationLink: new FormControl(''),
    locationDescription: new FormControl(''),
    virtualApp: new FormControl(''),
    virtualLink: new FormControl(''),
    category: new FormControl(''),
  });

  ngOnInit() {
    this.eventForm = new FormGroup({
      description: new FormControl(''),
      location: new FormControl(''),
      price: new FormControl(''),
      imageUrl: new FormControl(''),
      capacity: new FormControl(''),
      id: new FormControl(''),
      eventName: new FormControl('', Validators.required),
      cover: new FormControl(''),
      startDate: new FormControl(''),
      startTime: new FormControl(''),
      type: new FormControl('', Validators.required),
      universityLocation: new FormControl(''),
      state: new FormControl(''),
      placeName: new FormControl(''),
      locationLink: new FormControl(''),
      locationDescription: new FormControl(''),
      virtualApp: new FormControl(''),
      virtualLink: new FormControl(''),
      category: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      console.log('Form data', formData);
      this.eventsService.createEvent(formData).subscribe(
        () => {
          console.log('Event created successfully');
          this.router.navigate(['/events']);
        },
        (e) => {
          console.error('Error creating event', e.message);
        }
      );
    } else {
      console.error('Invalid form');
    }
  }
}