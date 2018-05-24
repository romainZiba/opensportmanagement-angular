import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamMember} from '../model/team-member';
import {TeamService} from '../services/team.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit, OnDestroy {

  teamMembers: TeamMember[];
  subscriptions = new Subscription();

  constructor(private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.subscriptions.add(
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

  inviteMembers() {
    this.router.navigate(['/invite-members']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
