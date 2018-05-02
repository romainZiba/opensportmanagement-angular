import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Opensportmanagement';
  isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn;
  }
}
