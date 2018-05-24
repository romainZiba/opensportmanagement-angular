import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {TeamService} from '../services/team.service';
import {TeamMember} from '../model/team-member';
import {Team} from '../model/team';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

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
  subscriptions = new Subscription();

  constructor(private userService: UserService,
              private teamService: TeamService,
              private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.subscriptions.add(this.userService.userFirstName$.subscribe(fn => this.firstName = fn));
    this.subscriptions.add(this.userService.userLastName$.subscribe(ln => this.lastName = ln));
    this.subscriptions.add(this.userService.email$.subscribe(email => this.email = email));
    this.subscriptions.add(this.userService.phoneNumber$.subscribe(phoneNumber => this.phoneNumber = phoneNumber));
    this.subscriptions.add(this.teamService.currentTeamMember$.subscribe(member => this.teamMember = member));
    this.subscriptions.add(this.teamService.selectedTeam$.subscribe(team => this.selectedTeam = team));
  }

  saveRecords() {
    this.subscriptions.add(
      this.userService.updateUser(this.firstName, this.lastName, this.phoneNumber, this.email)
        .subscribe(user => {
            this.openSnackBar('User information successfully saved');
          },
          error => {
            this.openSnackBar('An error occurred');
          })
    );
    this.subscriptions.add(
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
    this.subscriptions.unsubscribe();
  }
}
