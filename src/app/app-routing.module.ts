import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventsComponent } from './list-events/list-events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventCreationComponent } from './event-creation/event-creation.component';


const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full'},
  { path: 'events', component: ListEventsComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'ajout', component:EventCreationComponent},
  { path: '**', component: NotFoundComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
