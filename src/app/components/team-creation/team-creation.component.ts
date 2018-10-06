import { Component, OnDestroy, OnInit } from "@angular/core";
import { TeamService } from "../../services/team.service";
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar } from "@angular/material";
import { List } from "immutable";
import { Observable } from "rxjs/Observable";
import { Location } from "@angular/common";
import { BaseComponent } from "../../containers/base.container";

@Component({
  selector: "app-team-creation",
  templateUrl: "./team-creation.component.html",
  styleUrls: ["./team-creation.component.css"]
})
export class TeamCreationComponent extends BaseComponent
  implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  sports$: Observable<List<String>>;

  constructor(
    private teamService: TeamService,
    private snackbar: MatSnackBar,
    private location: Location
  ) {
    super(snackbar);
  }

  ngOnInit() {
    this.sports$ = this.teamService.getSports();
  }

  createTeam(form: TeamForm) {
    this.teamService
      .createTeam(form.name, form.sport)
      .then(
        success =>
          success
            ? (this.openSnackBar("Equipe créé avec succès"),
              this.location.back())
            : this.openSnackBar("An error occurred"),
        () => this.openSnackBar("An error occurred")
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

export interface TeamForm {
  name: string;
  sport: string;
}
