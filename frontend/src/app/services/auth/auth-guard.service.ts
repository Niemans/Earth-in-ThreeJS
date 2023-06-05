import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private authService: AuthService, private router:Router) { }

  canActivate()
  {
    if(!this.authService.isAdmin$.value) {
      this.router.navigate([""])
    }
    return this.authService.isAdmin$;
  }

}
