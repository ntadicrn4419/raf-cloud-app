import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public authService: MyAuthService, public apiService: ApiService, private router: Router) {}

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}
