import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceCreationComponent} from './place-creation.component';

describe("PlaceCreationComponent", () => {
  let component: PlaceCreationComponent;
  let fixture: ComponentFixture<PlaceCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceCreationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
