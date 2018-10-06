import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TeamService} from '../services/team.service';
import {BaseComponent} from './base.container';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ChampionshipForm} from '../components/championship-creation/championship-creation.component';

@Component({
  selector: "app-championship-creation",
  template: `
    <championship-creation
      (championship)="createChampionship($event)">
    </championship-creation>
  `
})
export class ChampionshipCreationSmartComponent extends BaseComponent
  implements OnInit, OnDestroy {
  seasonId: number;
  subscriptions = new Subscription();

  constructor(
    private teamService: TeamService,
    private snackbar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    super(snackbar);
  }

  ngOnInit() {
    this.seasonId = parseInt(this.route.snapshot.paramMap.get("id"), 10);
  }

  createChampionship(championship: ChampionshipForm) {
    this.teamService
      .createChampionship(championship, this.seasonId)
      .then(success => {
        if (success) {
          this.openSnackBar("Championnat créé avec succès");
          this.location.back();
        } else {
          this.openSnackBar("Une erreur s'est produite");
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
