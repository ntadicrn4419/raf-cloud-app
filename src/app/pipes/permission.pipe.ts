import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from '../models';

@Pipe({
  name: 'permission',
})
export class PermissionPipe implements PipeTransform {
  transform(permission: Permission): string {
    
    switch (permission.toString()) {
      case 'CAN_READ_USERS':
        return 'READ';
      case 'CAN_CREATE_USERS':
        return 'CREATE';
      case 'CAN_UPDATE_USERS':
        return 'UPDATE';
      case 'CAN_DELETE_USERS':
        return 'DELETE';
      case 'CAN_SEARCH_MACHINES':
        return 'SEARCH';
      case 'CAN_START_MACHINES':
        return 'START';
      case 'CAN_STOP_MACHINES':
        return 'STOP';
      case 'CAN_RESTART_MACHINES':
        return 'RESTART';
      case 'CAN_CREATE_MACHINES':
        return 'CREATE';
      case 'CAN_DESTROY_MACHINES':
        return 'DESTROY';
      default:
        return '';
    }
  }
}
