import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../models/team';
import { TeamService } from './team.service';
import { TEAMS_API } from '../token';

@Injectable({
  providedIn: 'root'
})
export class TeamHttpService extends TeamService {
  constructor(private http: HttpClient, @Inject(TEAMS_API) private teamsApiUrl: string) {
    super();
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsApiUrl, { withCredentials: true });
  }
}
