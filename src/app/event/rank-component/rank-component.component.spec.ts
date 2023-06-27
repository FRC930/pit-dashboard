import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankComponentComponent } from './rank-component.component';

describe('RankComponentComponent', () => {
  let component: RankComponentComponent;
  let fixture: ComponentFixture<RankComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankComponentComponent]
    });
    fixture = TestBed.createComponent(RankComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
