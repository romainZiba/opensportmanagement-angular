import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {

  private confirmationId: string;
  confirmationForm: FormGroup;
  hideNewPwd = true;
  hideConfirmNewPwd = true;

  // TODO: check new password and confirmNewPassword are equal
  newPwdControl = new FormControl('', Validators.required);
  confirmNewPwdControl = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      this.confirmationId = params['id'];
    });
    this.confirmationForm = fb.group({
      newPwdControl: this.newPwdControl,
      confirmNewPwdControl: this.confirmNewPwdControl
    }, {
      validator: this.samePwd
    });
  }

  ngOnInit() {}

  samePwd(group: FormGroup) {
    return group.value.newPwdControl === group.value.confirmNewPwdControl ? null : {
      same: false
    };
  }

  confirmAccount() {
    const newPwd = this.newPwdControl.value;
    this.userService.confirmAccount(this.confirmationId, newPwd).then(
      bool => {
        if (bool) {
          this.openSnackBar('Mot de passe modifié');
          this.router.navigate(['/login']);
        } else {
          this.openSnackBar('Une erreur s\'est produite');
        }
      },
      () => this.openSnackBar('Une erreur s\'est produite')
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message,  '',  {
      duration: 2000,
    });
  }
}
