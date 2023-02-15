import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from '../models';

@Pipe({
  name: 'permission',
})
export class PermissionPipe implements PipeTransform {
  transform(value: Permission[]): string {
    switch (value.length) {
      case 1:
        return 'CAN READ';
      case 2:
        return 'CAN READ & CREATE';
      case 3:
        return 'CAN READ, CREATE & UPDATE';
      case 4:
        return 'CAN READ, CREATE, UPDATE & DELETE';
      default:
        return '';  
    }
  }
}
