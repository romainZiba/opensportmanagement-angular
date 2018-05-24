import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from '../services/team.service';
import {Subscription} from 'rxjs/Subscription';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-creation',
  templateUrl: './team-creation.component.html',
  styleUrls: ['./team-creation.component.css']
})
export class TeamCreationComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  name: string;
  sport: string;

  constructor(private teamService: TeamService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  createTeam(name: string, sport: string) {
    this.teamService.createTeam(name, sport).then(
      () => {
        this.openSnackBar('Team successfully created');
        this.router.navigate(['event-list']);
      }, () => this.openSnackBar('An error occurred')
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
