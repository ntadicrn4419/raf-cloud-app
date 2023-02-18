import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Permission } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {
  name = new FormControl('');

  authorised: boolean = false;

  constructor(private apiService: ApiService, private myAuthService: MyAuthService) { }

  ngOnInit(): void {
    if(this.myAuthService.isAuthorised(Permission.CAN_CREATE_MACHINES)) {
      this.authorised = true;
    }
  }
  createMachine() {
    this.apiService.createMachine(this.name.value!);
  }

}
