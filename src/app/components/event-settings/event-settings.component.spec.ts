import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSettingsComponent } from './event-settings.component';

describe('EventSettingsComponent', () => {
  let component: EventSettingsComponent;
  let fixture: ComponentFixture<EventSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
