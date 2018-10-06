import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import {UserService} from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService
      .whoAmI()
      .map(e => {
        if (e.status !== 200) {
          this.router.navigate(["/login"]);
          return false;
        }
        return true;
      })
      .catch(() => {
        this.router.navigate(["/login"]);
        return of(false);
      });
  }
}
