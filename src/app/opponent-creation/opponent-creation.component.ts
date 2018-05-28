import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {TeamService} from '../services/team.service';
import {EventCreationComponent} from '../event-creation/event-creation.component';
import {Opponent} from '../model/opponent';
import {OpponentService} from '../services/opponent.service';

@Component({
  selector: 'app-opponent-creation',
  templateUrl: './opponent-creation.component.html',
  styleUrls: ['./opponent-creation.component.css']
})
export class OpponentCreationComponent implements OnInit {

  name: string;
  phoneNumber: string;
  email: string;

  constructor(private dialogRef: MatDialogRef<EventCreationComponent>,
              private teamService: TeamService,
              private opponentService: OpponentService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {}

  createOpponent(name: string, phoneNumber: string, email: string) {
    const opponent = new Opponent();
    opponent.name = name;
    opponent.phoneNumber = phoneNumber;
    opponent.email = email;
    this.teamService.selectedTeam$.subscribe(selectedTeam =>
      this.opponentService.createOpponent(selectedTeam._id, opponent).then(
        () => {
          this.openSnackBar('Opponent successfully created');
          this.dialogRef.close();
        }, () => this.openSnackBar('An error occurred')
      )
    );
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
