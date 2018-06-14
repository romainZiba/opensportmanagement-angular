import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Credentials} from '../model/credentials';

@Component({
  selector: 'app-login',
  template: `
    <login-form (credentials)="login($event)"></login-form>
  `,

})
export class LoginSmartComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  login(creds: Credentials): void {
    const sub = this.userService.authenticate(creds.username, creds.password)
      .subscribe(() => this.router.navigate(['event-list']));
    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
