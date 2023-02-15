import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Permission } from 'src/app/models';
import { CAN_READ, CAN_CREATE, CAN_UPDATE, CAN_DELETE } from './constants';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  CAN_READ: string = CAN_READ;
  CAN_CREATE: string = CAN_CREATE;
  CAN_UPDATE: string = CAN_UPDATE;
  CAN_DELETE: string = CAN_DELETE;

  @Output() changeValue = new EventEmitter();

  permissionsForm = new FormGroup({
    permissions: new FormControl(CAN_READ), //by default new user can read other users
  });

  ngOnInit(): void {
    this.permissionsForm.get('permissions')?.valueChanges.subscribe((value) => {
      const permissionList = this.createPermissionList(value!);
      this.changeValue.emit(permissionList);
    })
  }
  private createPermissionList(permissions: string): Permission[] {
    const resultList = [];
    switch (permissions) {
      case CAN_READ:
        resultList.push(Permission.CAN_READ_USERS);
        break;
      case CAN_CREATE:
        resultList.push(Permission.CAN_READ_USERS, Permission.CAN_CREATE_USERS);
        break;
      case CAN_UPDATE:
        resultList.push(
          Permission.CAN_READ_USERS,
          Permission.CAN_CREATE_USERS,
          Permission.CAN_UPDATE_USERS
        );
        break;
      case CAN_DELETE:
        resultList.push(
          Permission.CAN_READ_USERS,
          Permission.CAN_CREATE_USERS,
          Permission.CAN_UPDATE_USERS,
          Permission.CAN_DELETE_USERS
        );
        break;
      default:
        resultList.push(Permission.CAN_READ_USERS);
    }
    return resultList;
  }
}
