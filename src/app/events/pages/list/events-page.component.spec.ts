import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventsPageComponent } from "./events-page.component";
import { EventListComponent } from "../../components/event-list/event-list.component";
import { EventItemComponent } from "../../components/event-item/event-item.component";
import { MatIconModule } from "@angular/material";

describe("EventsPageComponent", () => {
  let component: EventsPageComponent;
  let fixture: ComponentFixture<EventsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [
        EventsPageComponent,
        EventListComponent,
        EventItemComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
