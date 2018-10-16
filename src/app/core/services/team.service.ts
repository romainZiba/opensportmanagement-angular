import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Team } from "../model/team";

@Injectable({
  providedIn: "root"
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>("/teams", { withCredentials: true });
  }

  selectTeam(team: Team) {}
}
