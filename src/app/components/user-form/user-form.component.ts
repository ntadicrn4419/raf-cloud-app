import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Permission } from 'src/app/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() disableEmailChange: boolean = false;

  userForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  @Output() formValue = new EventEmitter();

  permissionList: Permission[] = [Permission.CAN_READ_USERS]; // by default, new user can READ other users

  get firstname() {
    return this.userForm.get('firstname')!;
  }
  get lastname() {
    return this.userForm.get('lastname')!;
  }
  get email() {
    return this.userForm.get('email')!;
  }
  get password() {
    return this.userForm.get('password')!;
  }

  refreshPermissionList(permissions: Permission[]) {
    this.permissionList = permissions;
  }

  saveUser() {
    if (this.userForm.invalid) {
      alert('Failed. Form is invalid. Please fill it properly.');
      return;
    }
    const user = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      permissionList: this.permissionList,
    };
    console.log(user);
    this.formValue.emit(user);
  }

  constructor() {}

  ngOnInit(): void {
    if(this.disableEmailChange) {
      this.email.disable();
    }
  }
}
