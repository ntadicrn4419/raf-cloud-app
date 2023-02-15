import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Permission, User } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy{

  users: User[] = [];
  private sub!: Subscription;
  authorised: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private myAuthService: MyAuthService) { }
  
  ngOnInit(): void {
    this.authorised = this.myAuthService.isAuthorised(Permission.CAN_READ_USERS);
    this.sub = this.apiService.users$.subscribe( users => this.users = users);
    this.apiService.getAllUsers();
  }

  goToAddNewUserPage() {
    this.router.navigate(['/add-user']);
  }

  routeTo (email:string) {
    this.router.navigate([`/users/${email}`]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
