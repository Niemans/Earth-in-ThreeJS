import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  isAuthenticated:boolean[] = [false, false];


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated[0] = isLoggedIn;
    })
    this.authService.isAdmin$.subscribe((admin) => {
      this.isAuthenticated[1] = admin;
    })

    this.authService.isUserLoggedIn$.next(localStorage.getItem("token") !== null)
    if (this.isAuthenticated[0]){
      this.authService.isUserLoggedIn$.next(true);

      this.authService.checkType().subscribe( t => {
        this.authService.isAdmin$.next(t);
      });
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated[0] = false;
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }
}
