import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private authorisedToSearch: boolean = false;
  authorisedToDelete: boolean = false;

  searchFilters = new FormGroup({
    machineName: new FormControl(''),
    machineStatus: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  get machineName() {
    return this.searchFilters.get('machineName')!;
  }
  get machineStatus() {
    return this.searchFilters.get('machineStatus')!;
  }
  get startDate() {
    return this.searchFilters.get('startDate')!;
  }
  get endDate() {
    return this.searchFilters.get('endDate')!;
  }

  searchMachines() {
    if(!this.authorisedToSearch) {
      alert('You have no permission to search machines.');
      return;
    }
    this.filteredMachines = this.applyFilters(
      this.machineName.value,
      this.machineStatus.value,
      this.startDate.value,
      this.endDate.value
    );
  }
  private applyFilters(
    name: string | null,
    status: string | null,
    startDate: string | null,
    endDate: string | null
  ): Machine[] {
    let res: Machine[] = this.machines;
    if (name) {
      res = res.filter((machine) =>
        machine.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    if (status) {
      res = res.filter((machine) => machine.status.toString() === status);
    }
    if (startDate && endDate) {
      let dateFiltered: Machine[] = [];
      const searchingDateStarted = new Date(startDate);
      const searchingDateStopped = new Date(endDate);
      for (let machine of res) {
        for (let period of machine.runningPeriods) {
          const machineDateStarted = new Date(period.dateStarted);
          const machineDateStopped = new Date(period.dateStopped);
          if (
            machineDateStarted >= searchingDateStarted &&
            machineDateStopped <= searchingDateStopped
          ) {
            dateFiltered.push(machine);
            break;
          }
        }
      }
      res = dateFiltered;
    }
    return res;
  }

  destroyMachine(machine: Machine) {
    this.apiService.destroyMachine(machine);
  }
  constructor(private apiService: ApiService, private myAuthService: MyAuthService) {}

  ngOnInit(): void {
    this.authorisedToSearch = this.myAuthService.isAuthorised(Permission.CAN_SEARCH_MACHINES);
    this.authorisedToDelete = this.myAuthService.isAuthorised(Permission.CAN_DESTROY_MACHINES);
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
}
