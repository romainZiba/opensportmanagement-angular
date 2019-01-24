import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  @Input()
  pending: boolean;
  @Input()
  errorMessage: string | null;
  @Output()
  credentials = new EventEmitter<Credentials>();

  onLogin(username: string, password: string): void {
    this.credentials.emit({ username, password } as Credentials);
  }
}
