import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventsPageComponent } from "./events-page.component";
import { EventListComponent } from "../../components/event-list/event-list.component";
import { EventItemComponent } from "../../components/event-item/event-item.component";
import { MatIconModule, MatListModule } from "@angular/material";
import { NgxsModule } from "@ngxs/store";
import { EventsState } from "../../store";
import { EventService } from "../../services/event.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("EventsPageComponent", () => {
  let component: EventsPageComponent;
  let fixture: ComponentFixture<EventsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatListModule,
        NgxsModule.forRoot([EventsState])
      ],
      declarations: [
        EventsPageComponent,
        EventListComponent,
        EventItemComponent
      ],
      providers: [EventService]
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
