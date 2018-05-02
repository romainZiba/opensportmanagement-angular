import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  hide = true;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.userService.authenticate(this.username, this.password).subscribe(
      (response: HttpResponse<any>) => {
        this.router.navigate(['', 'dashboard']);
      }
    );
  }
}
