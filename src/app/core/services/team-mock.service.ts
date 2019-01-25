import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Team } from '../models/team';
import { TeamService } from './team.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMockService extends TeamService {
  getTeams(): Observable<Team[]> {
    return of([]);
  }
}
