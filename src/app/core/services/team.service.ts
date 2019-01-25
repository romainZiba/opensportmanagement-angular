import { Observable } from 'rxjs/Observable';
import { Team } from '../models/team';

export abstract class TeamService {
  abstract getTeams(): Observable<Team[]>;
}
