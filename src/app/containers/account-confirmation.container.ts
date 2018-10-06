import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material';
import {BaseComponent} from './base.container';

@Component({
  selector: "app-account-confirmation",
  template: `
    <account-confirmation [confirmationId]="confirmationId"
                          (newPassword)="confirmAccount($event)">
    </account-confirmation>
  `
})
export class AccountConfirmationSmartComponent extends BaseComponent
  implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  confirmationId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    super(snackbar);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.confirmationId = params["id"];
    });
  }

  confirmAccount(newPwd: string) {
    this.userService.confirmAccount(this.confirmationId, newPwd).then(
      success => {
        success
          ? (this.openSnackBar("Mot de passe modifié"),
            this.router.navigate(["/login"]))
          : this.openSnackBar("Une erreur s'est produite");
      },
      () => this.openSnackBar("Une erreur s'est produite")
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
