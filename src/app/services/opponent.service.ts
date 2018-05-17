import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Opponent} from '../model/opponent';

@Injectable()
export class OpponentService {

  constructor() { }

  private fakeOpponents = [
    new Opponent(0, 'Houston Rockets', '0010939300393', 'opponent@gmail.com', ''),
    new Opponent(0, 'Golden\'s State Warriors', '0010939300393', 'opponent@gmail.com', ''),
    new Opponent(0, 'San Antonio Spurs', '0010939300393', 'opponent@gmail.com', ''),
  ];

  getOpponents(): Observable<Opponent[]> {
    return Observable.of(this.fakeOpponents);
  }
}
