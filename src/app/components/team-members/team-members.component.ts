import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamMember} from '../../model/team-member';
import {TeamService} from '../../services/team.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {List} from 'immutable';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit, OnDestroy {

  teamMembers: List<TeamMember>;
  subscriptions = new Subscription();

  constructor(private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.subscriptions.add(
      this.teamService.selectedTeam$.subscribe(team => {
        if (team != null) {
          this.teamService.getTeamMembers(team._id);
        }
      })
    );
    this.subscriptions.add(
      this.teamService.teamMembers$.subscribe(members => this.teamMembers = members)
    );
  }

  inviteMembers() {
    this.router.navigate(['/invite-members']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
