import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {TeamService} from '../team.service';
import {TeamMember} from '../model/team-member';
import {Team} from '../model/team';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  teamMember: TeamMember;
  selectedTeam: Team;

  constructor(private userService: UserService,
              private teamService: TeamService,
              private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.userService.userFirstName$.subscribe(fn => this.firstName = fn);
    this.userService.userLastName$.subscribe(ln => this.lastName = ln);
    this.userService.email$.subscribe(email => this.email = email);
    this.userService.phoneNumber$.subscribe(phoneNumber => this.phoneNumber = phoneNumber);
    this.teamService.currentTeamMember$.subscribe(member => this.teamMember = member);
    this.teamService.selectedTeam$.subscribe(team => this.selectedTeam = team);
  }

  saveRecords() {
    this.userService.updateUser(this.firstName, this.lastName, this.phoneNumber, this.email)
      .subscribe(user => {
          this.openSnackBar('User information successfully saved');
          console.log('user updated: ' + JSON.stringify(user));
        },
        error => {
          this.openSnackBar('An error occurred');
          console.log('error occurrred ' + JSON.stringify(error));
        });
    this.userService.updateTeamMember(this.selectedTeam._id, this.teamMember.licenseNumber)
      .subscribe(user => console.log('user updated: ' + JSON.stringify(user)),
        error => console.log('error occurrred ' + JSON.stringify(error)));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }
}
