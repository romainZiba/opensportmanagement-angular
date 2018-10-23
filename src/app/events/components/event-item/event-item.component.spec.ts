import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventItemComponent } from "./event-item.component";
import { MatIconModule } from "@angular/material";

describe("EventItemComponent", () => {
  let component: EventItemComponent;
  let fixture: ComponentFixture<EventItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [EventItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    component.event = {
      _id: 1,
      name: "Team #1",
      fromDateTime: "",
      toDateTime: "",
      placeId: 1,
      placeName: "place",
      presentMembers: [],
      absentMembers: [],
      waitingMembers: [],
      cancelled: false,
      openForRegistration: false
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
