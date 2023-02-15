import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Permission, User } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  user!: User;

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  permissionList: Permission[] = [];
  
  authorisedToDelete: boolean = false;
  authorisedToUpdate: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router,  private myAuthService: MyAuthService) { }

  ngOnInit(): void {
    this.authorisedToDelete = this.myAuthService.isAuthorised(Permission.CAN_DELETE_USERS);
    this.authorisedToUpdate = this.myAuthService.isAuthorised(Permission.CAN_UPDATE_USERS);
    this.subscription = this.route.params.subscribe(params => {
      this.apiService.findUserByEmail(params['email']).subscribe((user) =>{
        this.user = user;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.password = user.password;
        this.permissionList = user.permissionList;
      })
    });
  }
  
  editUser(formData: any) {
    this.firstname = formData.firstname;
    this.lastname = formData.lastname;
    this.password = formData.password;
    this.permissionList = formData.permissionList;
    
    if (this.isValidData()) {
      this.apiService.updateUser(this.firstname, this.lastname, this.user.email, this.password, this.permissionList)
      .subscribe((updatedUser) => {
        this.user = updatedUser;
        alert('Successfully changed user data.');
      });
    }
  }
  
  isValidData() {
    if (
      this.firstname !== null &&
      this.firstname !== '' &&
      this.lastname !== null &&
      this.lastname !== '' &&
      this.email !== null &&
      this.email !== '' &&
      this.password !== null &&
      this.password !== ''
    ) {
      return true;
    }
    return false;
  }
  
  deleteUser(){ 
    if(this.user.email === localStorage.getItem('signedInUserEmail')) {
      alert('You can not delete yourself.');
      return;
    }
    if(confirm('Are you sure you want to delete this user?')){
      this.apiService.deleteUser(this.user.email)
      .subscribe(() =>  {
        this.router.navigate(['/users']);
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
