import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-account-confirmation',
  template: `
    <account-confirmation [confirmationId]="confirmationId"
                          (newPassword)="confirmAccount($event)">
    </account-confirmation>
  `
})
export class AccountConfirmationSmartComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  confirmationId: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.confirmationId = params['id'];
    });
  }

  confirmAccount(newPwd: string) {
    this.userService.confirmAccount(this.confirmationId, newPwd).then(
      success => {
        success ? (
          this.openSnackBar('Mot de passe modifié'),
            this.router.navigate(['/login'])
        ) : this.openSnackBar('Une erreur s\'est produite');
      },
      () => this.openSnackBar('Une erreur s\'est produite')
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
