import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventListComponent } from "./event-list.component";
import { EventItemComponent } from "../event-item/event-item.component";
import { MatIconModule } from "@angular/material";

describe("EventListComponent", () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [EventListComponent, EventItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
