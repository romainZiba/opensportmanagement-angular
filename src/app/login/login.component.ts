import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpResponse} from '@angular/common/http';
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
  authenticationSubscription: Subscription;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.authenticationSubscription = this.userService.authenticate(this.username, this.password).subscribe(
      (response: HttpResponse<any>) => {
        this.router.navigate(['', 'event-list']);
      }
    );
  }

  ngOnDestroy() {
    if (this.authenticationSubscription !== undefined) {
      this.authenticationSubscription.unsubscribe();
    }
  }
}
