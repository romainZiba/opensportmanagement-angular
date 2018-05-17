import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {TeamService} from '../services/team.service';
import {TeamMember} from '../model/team-member';
import {Team} from '../model/team';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  teamMember: TeamMember;
  selectedTeam: Team;
  disposables = [];

  constructor(private userService: UserService,
              private teamService: TeamService,
              private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.disposables.push(this.userService.userFirstName$.subscribe(fn => this.firstName = fn));
    this.disposables.push(this.userService.userLastName$.subscribe(ln => this.lastName = ln));
    this.disposables.push(this.userService.email$.subscribe(email => this.email = email));
    this.disposables.push(this.userService.phoneNumber$.subscribe(phoneNumber => this.phoneNumber = phoneNumber));
    this.disposables.push(this.teamService.currentTeamMember$.subscribe(member => this.teamMember = member));
    this.disposables.push(this.teamService.selectedTeam$.subscribe(team => this.selectedTeam = team));
  }

  saveRecords() {
    this.disposables.push(
      this.userService.updateUser(this.firstName, this.lastName, this.phoneNumber, this.email)
        .subscribe(user => {
            this.openSnackBar('User information successfully saved');
          },
          error => {
            this.openSnackBar('An error occurred');
          })
    );
    this.disposables.push(
      this.userService.updateTeamMember(this.selectedTeam._id, this.teamMember.licenseNumber)
        .subscribe(user => console.log('user updated: ' + JSON.stringify(user)),
          error => console.log('error occurrred ' + JSON.stringify(error)))
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.disposables.forEach(function(sub) {
      if (sub !== undefined) {
        sub.unsubscribe();
      }
    });
  }
}
