import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Credentials} from '../../model/credentials';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;

  @Input()
  set pending(isPending: boolean) {
    console.log('isPending? ' + isPending);
  }
  @Input()
  errorMessage: string | null;
  @Output()
  credentials = new EventEmitter<Credentials>();

  onLogin(username: string, password: string): void {
    this.credentials.emit(new Credentials(username, password));
  }
}
