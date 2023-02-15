import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MyAuthService } from './my-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private myAuthService: MyAuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.myAuthService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    alert('Please sign in.')
    return false;
  }
}
