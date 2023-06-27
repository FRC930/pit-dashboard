import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamScheduleComponentComponent } from './team-schedule-component.component';

describe('TeamScheduleComponentComponent', () => {
  let component: TeamScheduleComponentComponent;
  let fixture: ComponentFixture<TeamScheduleComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamScheduleComponentComponent]
    });
    fixture = TestBed.createComponent(TeamScheduleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
