import {Injectable} from '@angular/core';
import {Place} from '../model/place';
import {Observable} from 'rxjs/Observable';
import {Team} from '../model/team';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PlaceService {

  constructor(private http: HttpClient) { }

  private fakePlaces = [
    new Place(0, 'Stade Jean Mermoz', '97 Chemin d\'Aussonne, 31700 Blagnac, France', 'Stadium'),
    new Place(1, 'Stade Jean Moulin', 'Avenue des Écoles Jules Julien, 31400 Toulouse, France', 'Stadium'),
    new Place(2, 'Le Fousseret', '13 avenue des Pyrénées, 31430 Le Fousseret, France', 'Stadium'),
    new Place(3, 'La Daurade', '...', 'Other'),
    new Place(4, 'Les sales gosses', '...', 'Other')
  ];

  getPlaces(teamId: number): Observable<Place[]> {
    return this.http.get<Place[]>(`/teams/${teamId}/places`, { withCredentials: true });
  }
}
