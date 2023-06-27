import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { RankComponentComponent } from './event/rank-component/rank-component.component';
import { TeamScheduleComponentComponent } from './event/team-schedule-component/team-schedule-component.component';
import { EventScheduleComponentComponent } from './event/event-schedule-component/event-schedule-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    DiagnosticComponent,
    RankComponentComponent,
    TeamScheduleComponentComponent,
    EventScheduleComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
