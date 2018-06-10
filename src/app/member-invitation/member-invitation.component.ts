import {Component, OnInit} from '@angular/core';
import {TeamService} from '../services/team.service';
import {Team} from '../model/team';
import {TeamMember} from '../model/team-member';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-member-invitation',
  templateUrl: './member-invitation.component.html',
  styleUrls: ['./member-invitation.component.css']
})
export class MemberInvitationComponent implements OnInit {
  selectedTeam: Team;
  form: FormGroup;
  firstNameControl = new FormControl('', Validators.required);
  lastNameControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', Validators.required);
  possibleRoles = [{ id: 'PLAYER', name: 'Joueur'}, { id: 'ADMIN', name: 'Admin'}];
  rolesControl = new FormControl('', Validators.required);

  constructor(private teamService: TeamService,
              private snackBar: MatSnackBar,
              private location: Location,
              fb: FormBuilder) {
    this.form = fb.group({
      firstNameControl: this.firstNameControl,
      lastNameControl: this.lastNameControl,
      emailControl: this.emailControl,
      rolesControl: this.rolesControl
    });
  }

  ngOnInit() {
    this.teamService.selectedTeam$.subscribe(team => this.selectedTeam = team);
  }

  createTeamMember() {
    const member = new TeamMember();
    member.firstName = this.firstNameControl.value;
    member.lastName = this.lastNameControl.value;
    member.email = this.emailControl.value;
    member.roles = this.rolesControl.value;
    this.teamService.createTeamMember(this.selectedTeam._id, member)
      .then(success => {
          // TODO: i18n
          if (success) {
            this.openSnackBar('Utilisateur créé avec succès');
            this.location.back();
          } else {
            this.openSnackBar('Une erreur s\'est produite');
          }
        },
        () => this.openSnackBar('Une erreur s\'est produite')
      );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }
}
