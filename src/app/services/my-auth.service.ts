import { Injectable } from '@angular/core';
import { Permission } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MyAuthService {
  readonly Permission = Permission;
  constructor() {}

  isAuthenticated(): boolean {
    let token = localStorage.getItem('jwt_token');
    return token !== null ? true : false;
  }

  isAuthorised(requiredPermission: Permission): boolean {
    const permissionList = localStorage.getItem('permissions');
    return permissionList!.includes(Permission[requiredPermission]);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
