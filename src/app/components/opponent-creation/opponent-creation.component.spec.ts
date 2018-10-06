import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OpponentCreationComponent } from "./opponent-creation.component";

describe("OpponentCreationComponent", () => {
  let component: OpponentCreationComponent;
  let fixture: ComponentFixture<OpponentCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpponentCreationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
