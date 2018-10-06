import {Injectable} from '@angular/core';
import {Place} from '../model/place';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {List} from 'immutable';

@Injectable()
export class PlaceService {
  private placesSource = new BehaviorSubject<List<Place>>(List());

  readonly places$ = this.placesSource.asObservable();

  constructor(private http: HttpClient) {}

  getPlaces(teamId: number) {
    this.http
      .get<Place[]>(`/teams/${teamId}/places`, { withCredentials: true })
      .subscribe(places => this.placesSource.next(List(places)));
  }

  createPlace(teamId: number, place: Place): Promise<boolean> {
    return new Promise(resolve => {
      const subscription = this.http
        .post<Place>(`/teams/${teamId}/places`, place, {
          withCredentials: true
        })
        .subscribe(
          createdPlace => {
            this.placesSource.next(
              this.placesSource.getValue().push(createdPlace)
            );
            resolve(true);
          },
          error => resolve(false)
        );
      setTimeout(function() {
        subscription.unsubscribe();
      }, 5000);
    });
  }
}
