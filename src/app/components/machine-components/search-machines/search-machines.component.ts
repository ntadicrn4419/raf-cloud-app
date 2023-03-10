import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';
import { Machine, MachineStatus, Permission } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
  selector: 'app-search-machines',
  templateUrl: './search-machines.component.html',
  styleUrls: ['./search-machines.component.css'],
})
export class SearchMachinesComponent implements OnInit, OnDestroy {
  readonly MachineStatus = MachineStatus;

  machines: Machine[] = [];
  filteredMachines: Machine[] = [];
  private sub!: Subscription;
  authorisedToSearch: boolean = false;
  authorisedToDelete: boolean = false;
  authorisedToStop: boolean = false;
  authorisedToStart: boolean = false;
  authorisedToRestart: boolean = false;

  searchFilters = new FormGroup({
    machineName: new FormControl(''),
    machineStatus: new FormControl(''),
    startRunningDate: new FormControl(''),
    stopRunningDate: new FormControl(''),
    startRunningTime: new FormControl('00:00'),
    stopRunningTime: new FormControl('00:00'),
    startCreatedDate: new FormControl(''),
    stopCreatedDate: new FormControl(''),
    startCreatedTime: new FormControl('00:00'),
    stopCreatedTime: new FormControl('00:00'),
  });

  scheduleOperationDate = new FormControl('');
  scheduleOperationTime = new FormControl('');

  get machineName() {
    return this.searchFilters.get('machineName')!;
  }
  get machineStatus() {
    return this.searchFilters.get('machineStatus')!;
  }
  get startRunningDate() {
    return this.searchFilters.get('startRunningDate')!;
  }
  get stopRunningDate() {
    return this.searchFilters.get('stopRunningDate')!;
  }
  get startRunningTime() {
    return this.searchFilters.get('startRunningTime')!;
  }
  get stopRunningTime() {
    return this.searchFilters.get('stopRunningTime')!;
  }
  get startCreatedDate() {
    return this.searchFilters.get('startCreatedDate')!;
  }
  get stopCreatedDate() {
    return this.searchFilters.get('stopCreatedDate')!;
  }
  get startCreatedTime() {
    return this.searchFilters.get('startCreatedTime')!;
  }
  get stopCreatedTime() {
    return this.searchFilters.get('stopCreatedTime')!;
  }

  searchMachines() {
    if (!this.authorisedToSearch) {
      alert('You have no permission to search machines.');
      return;
    }
    let startRunningDateWithTimeAsLong: number | null = null;
    let stopRunningDateWithTimeAsLong: number | null = null;

    if (this.startRunningDate.value && this.stopRunningDate.value) {
      startRunningDateWithTimeAsLong = this.formatDateTimeToLong(
        this.startRunningDate.value,
        this.startRunningTime.value
      );
      stopRunningDateWithTimeAsLong = this.formatDateTimeToLong(
        this.stopRunningDate.value,
        this.stopRunningTime.value
      );
    }

    let startCreatedDateWithTimeAsLong: number | null = null;
    let stopCreatedDateWithTimeAsLong: number | null = null;

    if (this.startCreatedDate.value && this.stopCreatedDate.value) {
      startCreatedDateWithTimeAsLong = this.formatDateTimeToLong(
        this.startCreatedDate.value,
        this.startCreatedTime.value
      );
      stopCreatedDateWithTimeAsLong = this.formatDateTimeToLong(
        this.stopCreatedDate.value,
        this.stopCreatedTime.value
      );
    }

    this.apiService
      .searchMachinesByFilters(
        this.machineName.value,
        this.machineStatus.value,
        startRunningDateWithTimeAsLong,
        stopRunningDateWithTimeAsLong,
        startCreatedDateWithTimeAsLong,
        stopCreatedDateWithTimeAsLong
      )
      .subscribe((response) => {
        this.filteredMachines = response.machines;
      });
  }

  destroyMachine(machine: Machine) {
    if (
      confirm(
        'Are you sure you want to destroy this machine? You will not be able to undo this action.'
      )
    ) {
      this.apiService.destroyMachine(machine);
    }
  }

  startMachine(id: number) {
    if (
      this.scheduleOperationDate.value! &&
      this.scheduleOperationTime.value!
    ) {
      const datetime = this.formatDateTimeToLong(
        this.scheduleOperationDate.value,
        this.scheduleOperationTime.value
      );
      this.apiService.scheduleMachineStart(id, datetime).subscribe(() => {
        alert(`Success. Machine will start at ${this.scheduleOperationDate.value} ${this.scheduleOperationTime.value}`);
      });
    } else {
      this.apiService.startMachine(id).subscribe(
        (res: any) => {
          alert('Success. Machine is starting, please wait.');
        },
        (error: HttpErrorResponse) => {
          if(error.error.text) {
            alert(error.error.text);
          }else{
            alert(error.error);
          }
        }
      );
    }
  }
  stopMachine(id: number) {
    if (
      this.scheduleOperationDate.value! &&
      this.scheduleOperationTime.value!
    ) {
      const datetime = this.formatDateTimeToLong(
        this.scheduleOperationDate.value,
        this.scheduleOperationTime.value
      );
      this.apiService.scheduleMachineStop(id, datetime).subscribe(() => {
        alert(`Success. Machine will stop at ${this.scheduleOperationDate.value} ${this.scheduleOperationTime.value}`);
      });
    } else {
      this.apiService.stopMachine(id).subscribe(
        (res: any) => {
          alert('Success. Machine is stopping, please wait.');
        },
        (error: HttpErrorResponse) => {
          if(error.error.text) {
            alert(error.error.text);
          }else{
            alert(error.error);
          }
        }
      );
    }
  }
  restartMachine(id: number) {
    if (
      this.scheduleOperationDate.value! &&
      this.scheduleOperationTime.value!
    ) {
      const datetime = this.formatDateTimeToLong(
        this.scheduleOperationDate.value,
        this.scheduleOperationTime.value
      );
      this.apiService.scheduleMachineRestart(id, datetime).subscribe(() => {
        alert(`Success. Machine will restart at ${this.scheduleOperationDate.value} ${this.scheduleOperationTime.value}`);
      });
    } else {
      this.apiService.restartMachine(id).subscribe(
        (res: any) => {
          alert('Success. Machine is restarting, please wait.');
        },
        (error: HttpErrorResponse) => {
          if(error.error.text) {
            alert(error.error.text);
          }else{
            alert(error.error);
          }
        }
      );
    }
  }

  constructor(
    private apiService: ApiService,
    private myAuthService: MyAuthService
  ) {}

  ngOnInit(): void {
    this.authorisedToSearch = this.myAuthService.isAuthorised(
      Permission.CAN_SEARCH_MACHINES
    );
    this.authorisedToDelete = this.myAuthService.isAuthorised(
      Permission.CAN_DESTROY_MACHINES
    );
    this.authorisedToStart = this.myAuthService.isAuthorised(
      Permission.CAN_START_MACHINES
    );
    this.authorisedToStop = this.myAuthService.isAuthorised(
      Permission.CAN_STOP_MACHINES
    );
    this.authorisedToRestart = this.myAuthService.isAuthorised(
      Permission.CAN_RESTART_MACHINES
    );
    this.sub = this.apiService.userMachines$.subscribe((machines) => {
      this.machines = machines;
      this.filteredMachines = machines;
    });
    this.apiService.getUserMachines();
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private formatDateTimeToLong(
    date: string | null,
    time: string | null
  ): number | null {
    if (date && time) {
      return new Date(`${date} ${time}`).getTime();
    }
    return null;
  }
}
