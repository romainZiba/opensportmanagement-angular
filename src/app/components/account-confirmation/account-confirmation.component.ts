import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: "account-confirmation",
  templateUrl: "./account-confirmation.component.html",
  styleUrls: ["./account-confirmation.component.css"]
})
export class AccountConfirmationComponent implements OnInit {
  @Input()
  confirmationId: string;

  @Output("newPassword")
  passwordEmitter = new EventEmitter<string>();

  confirmationForm: FormGroup;
  hideNewPwd = true;
  hideConfirmNewPwd = true;

  newPwdControl = new FormControl("", Validators.required);
  confirmNewPwdControl = new FormControl("", Validators.required);

  constructor(private fb: FormBuilder) {
    this.confirmationForm = fb.group(
      {
        newPwdControl: this.newPwdControl,
        confirmNewPwdControl: this.confirmNewPwdControl
      },
      {
        validator: this.samePwd
      }
    );
  }

  ngOnInit() {}

  samePwd(group: FormGroup) {
    return group.value.newPwdControl === group.value.confirmNewPwdControl
      ? null
      : {
          same: false
        };
  }

  onConfirmAccount(newPassword: string) {
    this.passwordEmitter.emit(newPassword);
  }
}
