import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Team } from "../../model/team";
import { List } from "immutable";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<List<Team>> {
    return this.http.get<List<Team>>("/teams", { withCredentials: true });
  }

  selectTeam(team: Team) {}
}
