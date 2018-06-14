import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  username = '';
  password = '';
  hide = true;
  subscriptions = new Subscription();

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.subscriptions.add(
      this.userService.authenticate(this.username, this.password).subscribe(() => this.router.navigate(['event-list']))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
