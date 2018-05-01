import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Credentials } from '../model/credentials';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.userService.authenticate(this.username, this.password).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.router.navigate(['', 'dashboard']);
      }
    );
  }
}
