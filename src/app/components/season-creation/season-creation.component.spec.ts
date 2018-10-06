import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SeasonCreationComponent } from "./season-creation.component";

describe("SeasonCreationComponent", () => {
  let component: SeasonCreationComponent;
  let fixture: ComponentFixture<SeasonCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonCreationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
