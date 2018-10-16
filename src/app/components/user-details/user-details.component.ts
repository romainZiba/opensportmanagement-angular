import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {TeamService} from '../../services/team.service';
import {TeamMember} from '../../model/team-member';
import {Team} from '../../core/model/team';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {User} from '../../model/user';

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: User;
  teamMember: TeamMember;
  selectedTeam: Team;
  subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    const userSub = this.userService.user$.subscribe(
      user => (this.user = user)
    );
    const teamMemberSub = this.teamService.currentTeamMember$.subscribe(
      member => (this.teamMember = member)
    );
    const selectedTeamSub = this.teamService.selectedTeam$.subscribe(
      team => (this.selectedTeam = team)
    );
    this.subscriptions
      .add(userSub)
      .add(teamMemberSub)
      .add(selectedTeamSub);
  }

  saveUserDetails(userForm: NgForm) {
    this.userService
      .updateUser(
        userForm.value["firstName"],
        userForm.value["lastName"],
        userForm.value["phoneNumber"],
        userForm.value["email"],
        this.selectedTeam._id,
        userForm.value["licenceNumber"]
      )
      // TODO: i18n
      .then(
        () => this.openSnackBar("Informations mises à jour"),
        () => this.openSnackBar("Une erreur s'est produite")
      );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
