import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  permissionList: Permission[] = [];

  authorised: boolean = false;

  constructor(
    private apiService: ApiService,
    private myAuthService: MyAuthService
  ) {}

  ngOnInit(): void {
    this.authorised = this.myAuthService.isAuthorised(
      Permission.CAN_CREATE_USERS
    );
  }

  addUser(formData: any) {
    this.firstname = formData.firstname;
    this.lastname = formData.lastname;
    this.email = formData.email;
    this.password = formData.password;
    this.permissionList = formData.permissionList;

    if (this.isValidData()) {
      this.apiService.createUser(
        this.firstname,
        this.lastname,
        this.email,
        this.password,
        this.permissionList
      );
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
}
