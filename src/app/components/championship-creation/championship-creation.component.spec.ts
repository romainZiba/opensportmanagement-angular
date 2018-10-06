import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChampionshipCreationComponent} from './championship-creation.component';

describe("ChampionshipCreationComponent", () => {
  let component: ChampionshipCreationComponent;
  let fixture: ComponentFixture<ChampionshipCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipCreationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
