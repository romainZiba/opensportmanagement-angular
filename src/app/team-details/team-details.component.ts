import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamMember} from '../model/team-member';
import {TeamService} from '../services/team.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit, OnDestroy {

  teamMembers: TeamMember[];
  disposables = [];

  constructor(private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.disposables.push(
      this.teamService.selectedTeam$
        .flatMap(team => {
          if (team !== null && team !== undefined) {
            return this.teamService.getTeamMembers(team._id);
          }
          return Observable.of([]);
        })
        .subscribe(members => this.teamMembers = members)
    );
  }

  ngOnDestroy() {
    this.disposables.forEach(function(sub) {
      if (sub !== undefined) {
        sub.unsubscribe();
      }
    });
  }

  inviteMembers() {
    this.router.navigate(['/invite-members']);
  }
}
