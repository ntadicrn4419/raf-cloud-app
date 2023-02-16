import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMachinesComponent } from './search-machines.component';

describe('SearchMachinesComponent', () => {
  let component: SearchMachinesComponent;
  let fixture: ComponentFixture<SearchMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMachinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
