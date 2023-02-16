import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-machines',
  templateUrl: './search-machines.component.html',
  styleUrls: ['./search-machines.component.css'],
})
export class SearchMachinesComponent implements OnInit {
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

  // onSelect(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   this.machineStatusDropdown.setValue(target.value);
  // }

  searchMachines() {
    console.log(this.machineName.value, this.machineStatus.value, this.startDate.value, this.endDate.value);
  }
  constructor() {}

  ngOnInit(): void {}
}
