import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemsSingleChoiceComponent } from './list-items-single-choice.component';

describe('ListItemsSingleChoiceComponent', () => {
  let component: ListItemsSingleChoiceComponent;
  let fixture: ComponentFixture<ListItemsSingleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemsSingleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsSingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
