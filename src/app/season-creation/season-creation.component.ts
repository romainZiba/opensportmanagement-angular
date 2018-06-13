import {Component, OnInit} from '@angular/core';
import {FORMAT_DATE} from '../app.module';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventCreationComponent} from '../event-creation/event-creation.component';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {DateValidator} from '../validators/DateValidator';
import * as moment from 'moment';
import {TeamService} from '../services/team.service';
import {Season} from '../model/season';

@Component({
  selector: 'app-season-creation',
  templateUrl: './season-creation.component.html',
  styleUrls: ['./season-creation.component.css']
})
export class SeasonCreationComponent implements OnInit {

  form: FormGroup;
  nameControl = new FormControl('', Validators.required);
  fromDateControl = new FormControl(moment().format(FORMAT_DATE),
    [Validators.required, DateValidator.dateMinimum(moment().startOf('day'))]);
  toDateControl = new FormControl(moment().format(FORMAT_DATE),
    [Validators.required, DateValidator.dateMinimum(moment().startOf('day'))]);
  selectedTeamId: number;

  constructor(private dialogRef: MatDialogRef<EventCreationComponent>,
              private fb: FormBuilder,
              private teamService: TeamService,
              private snackBar: MatSnackBar) {
    this.form = fb.group({
      nameControl: this.nameControl,
      fromDateControl: this.fromDateControl,
      toDateControl: this.toDateControl
    });
  }

  ngOnInit() {
    this.teamService.selectedTeam$.subscribe(team => this.selectedTeamId = team._id);
  }

  createSeason() {
    const season = new Season();
    season.name = this.nameControl.value;
    season.fromDate = this.fromDateControl.value;
    season.toDate = this.toDateControl.value;
    this.teamService.createSeason(this.selectedTeamId, season).then(success => {
      if (success) {
        this.openSnackBar('Saison créé avec succès');
        this.dialogRef.close();
      } else {
        this.openSnackBar('Une erreur s\'est produite');
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
