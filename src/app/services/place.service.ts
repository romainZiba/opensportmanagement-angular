import {Injectable} from '@angular/core';
import {Place} from '../model/place';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {List} from 'immutable';

@Injectable()
export class PlaceService {
  private placesSource = new BehaviorSubject<List<Place>>(List());

  readonly places$ = this.placesSource.asObservable();

  constructor(private http: HttpClient) { }

  getPlaces(teamId: number) {
    this.http.get<Place[]>(`/teams/${teamId}/places`, { withCredentials: true })
      .subscribe(places => this.placesSource.next(List(places)));
  }
}
