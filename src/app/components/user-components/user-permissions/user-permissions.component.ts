import { Component, Input, OnInit } from '@angular/core';
import { Permission } from 'src/app/models';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {

  @Input() permissionList: Permission[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
