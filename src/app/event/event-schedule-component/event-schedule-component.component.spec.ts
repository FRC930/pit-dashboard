import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventScheduleComponentComponent } from './event-schedule-component.component';

describe('EventScheduleComponentComponent', () => {
  let component: EventScheduleComponentComponent;
  let fixture: ComponentFixture<EventScheduleComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventScheduleComponentComponent]
    });
    fixture = TestBed.createComponent(EventScheduleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
