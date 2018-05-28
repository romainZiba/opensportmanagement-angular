import {Injectable} from '@angular/core';
import {Opponent} from '../model/opponent';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OpponentService {
  private opponentsSource = new BehaviorSubject<List<Opponent>>(List());

  readonly opponents$ = this.opponentsSource.asObservable();

  constructor(private http: HttpClient) { }

  getOpponents(teamId: number) {
    this.http.get<Opponent[]>(`/teams/${teamId}/opponents`, { withCredentials: true })
      .subscribe(opponents => this.opponentsSource.next(List(opponents)));
  }

  createOpponent(teamId: number, opponent: Opponent): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http.post<Opponent>(`/teams/${teamId}/opponents`, opponent, {withCredentials: true})
        .subscribe(createdOpponent => {
          this.opponentsSource.next(this.opponentsSource.getValue().push(createdOpponent));
          resolve(true);
        }, error => resolve(false));
      setTimeout(function() { subscription.unsubscribe(); }, 5000);
    });
  }
}
