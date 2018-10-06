import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: "championship-creation",
  templateUrl: "./championship-creation.component.html",
  styleUrls: ["./championship-creation.component.css"]
})
export class ChampionshipCreationComponent {
  @Output("championship")
  championshipEmitter = new EventEmitter<ChampionshipForm>();

  onCreate(championship: ChampionshipForm) {
    this.championshipEmitter.emit(championship);
  }
}

export interface ChampionshipForm {
  name: string;
}
