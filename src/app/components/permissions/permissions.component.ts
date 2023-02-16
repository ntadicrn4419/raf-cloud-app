import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Permission } from 'src/app/models';
import {
  CAN_READ,
  CAN_CREATE,
  CAN_UPDATE,
  CAN_DELETE,
  CAN_SEARCH,
  CAN_START,
  CAN_STOP,
  CAN_RESTART,
  CAN_CREATE_M,
  CAN_DESTROY,
} from './constants';

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

  CAN_SEARCH: string = CAN_SEARCH;
  CAN_START: string = CAN_START;
  CAN_STOP: string = CAN_STOP;
  CAN_RESTART: string = CAN_RESTART;
  CAN_CREATE_M: string = CAN_CREATE_M;
  CAN_DESTROY: string = CAN_DESTROY;

  @Output() changeValue = new EventEmitter();

  permissionsForm = new FormGroup({
    userManagementPermissions: new FormControl(CAN_READ), //by default new user can read other users
    canSearchMachines: new FormControl(false),
    canStartMachines: new FormControl(false),
    canStopMachines: new FormControl(false),
    canRestartMachines: new FormControl(false),
    canCreateMachines: new FormControl(false),
    canDestroyMachines: new FormControl(false),
  });

  ngOnInit(): void {
    // this.permissionsForm
    //   .get('userManagementPermissions')
    //   ?.valueChanges.subscribe((value) => {
    //     const permissionList = this.createPermissionList(value!);
    //     this.changeValue.emit(permissionList);
    //   });
    this.permissionsForm.valueChanges.subscribe(() => {
      const userManagementPermissionList =
        this.createUserManagementPermissionList();
      const machineManagementPermissionList =
        this.createMachineManagementPermissionList();
      const permissionList = [
        ...userManagementPermissionList,
        ...machineManagementPermissionList,
      ];
      console.log(permissionList);
      this.changeValue.emit(permissionList);
    });
  }
  private createUserManagementPermissionList(): Permission[] {
    const resultList = [];
    const permissions = this.permissionsForm.get(
      'userManagementPermissions'
    )?.value;
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
  private createMachineManagementPermissionList(): Permission[] {
    const resultList = [];
    const can_search_machines =
      this.permissionsForm.get('canSearchMachines')?.value;
    const can_start_machines =
      this.permissionsForm.get('canStartMachines')?.value;
    const can_stop_machines =
      this.permissionsForm.get('canStopMachines')?.value;
    const can_restart_machines =
      this.permissionsForm.get('canRestartMachines')?.value;
    const can_create_machines =
      this.permissionsForm.get('canCreateMachines')?.value;
    const can_destroy_machines =
      this.permissionsForm.get('canDestroyMachines')?.value;

    if (can_search_machines) {
      resultList.push(Permission.CAN_SEARCH_MACHINES);
    }
    if (can_start_machines) {
      resultList.push(Permission.CAN_START_MACHINES);
    }
    if (can_stop_machines) {
      resultList.push(Permission.CAN_STOP_MACHINES);
    }
    if (can_restart_machines) {
      resultList.push(Permission.CAN_RESTART_MACHINES);
    }
    if (can_create_machines) {
      resultList.push(Permission.CAN_CREATE_MACHINES);
    }
    if (can_destroy_machines) {
      resultList.push(Permission.CAN_DESTROY_MACHINES);
    }
    return resultList;
  }
}
