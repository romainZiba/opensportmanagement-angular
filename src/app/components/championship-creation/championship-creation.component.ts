import {Component, Inject, OnInit} from '@angular/core';
import {EventCreationComponent} from '../event-creation/event-creation.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {TeamService} from '../../services/team.service';
import {IChampionship} from '../../model/championship';

@Component({
  selector: 'app-championship-creation',
  templateUrl: './championship-creation.component.html',
  styleUrls: ['./championship-creation.component.css']
})
export class ChampionshipCreationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EventCreationComponent>,
              private snackBar: MatSnackBar,
              private teamService: TeamService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  createChampionship(championship: IChampionship) {
    this.teamService.createChampionship(championship, this.data.seasonId).then(success => {
      if (success) {
        this.openSnackBar('Championnat créé avec succès');
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
