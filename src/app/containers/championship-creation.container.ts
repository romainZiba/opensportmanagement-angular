import {Component, Inject} from '@angular/core';
import {IChampionship} from '../model/championship';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {TeamService} from '../services/team.service';
import {EventCreationComponent} from '../components/event-creation/event-creation.component';
import {BaseComponent} from './base.container';

@Component({
  selector: 'app-championship-creation',
  template: `
    <championship-creation
      (championship)="createChampionship($event)"
      (cancel)="dismissDialog()">
    </championship-creation>
  `,

})
export class ChampionshipCreationSmartComponent extends BaseComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private teamService: TeamService,
              private dialogRef: MatDialogRef<EventCreationComponent>,
              private snackbar: MatSnackBar) {
    super(snackbar);
  }

  createChampionship(championship: IChampionship) {
    this.teamService.createChampionship(championship, this.data.seasonId).then(success => {
      if (success) {
        this.openSnackBar('Championnat créé avec succès');
        this.dismissDialog();
      } else {
        this.openSnackBar('Une erreur s\'est produite');
      }
    });
  }

  dismissDialog() {
    this.dialogRef.close();
  }
}
