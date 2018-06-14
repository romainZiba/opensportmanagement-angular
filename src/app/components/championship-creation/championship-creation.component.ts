import {Component, EventEmitter, Output} from '@angular/core';
import {IChampionship} from '../../model/championship';

@Component({
  selector: 'championship-creation',
  templateUrl: './championship-creation.component.html',
  styleUrls: ['./championship-creation.component.css']
})
export class ChampionshipCreationComponent {

  @Output('championship')
  championshipEmitter = new EventEmitter<IChampionship>();
  @Output('cancel')
  cancelEmitter = new EventEmitter();

  onCreate(championship: IChampionship) {
    this.championshipEmitter.emit(championship);
  }

  onCancel() {
    this.cancelEmitter.emit();
  }
}
