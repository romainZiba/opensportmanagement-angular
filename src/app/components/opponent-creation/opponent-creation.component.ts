import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TeamService} from '../../services/team.service';
import {Opponent} from '../../model/opponent';
import {OpponentService} from '../../services/opponent.service';
import {Location} from '@angular/common';

@Component({
  selector: "app-opponent-creation",
  templateUrl: "./opponent-creation.component.html",
  styleUrls: ["./opponent-creation.component.css"]
})
export class OpponentCreationComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private opponentService: OpponentService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit() {}

  createOpponent(form: OpponentForm) {
    const opponent = new Opponent();
    opponent.name = form.name;
    opponent.phoneNumber = form.phoneNumber;
    opponent.email = form.email;
    this.teamService.selectedTeam$.subscribe(selectedTeam =>
      this.opponentService.createOpponent(selectedTeam._id, opponent).then(
        success => {
          // TODO: i18n
          success
            ? (this.openSnackBar("Adversaire créé avec succès"),
              this.location.back())
            : this.openSnackBar("Une erreur s'est produite");
        },
        () => this.openSnackBar("Une erreur s'est produite")
      )
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 2000
    });
  }
}

export interface OpponentForm {
  name: string;
  phoneNumber: string;
  email: string;
}
