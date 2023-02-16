import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsHistoryComponent } from './errors-history.component';

describe('ErrorsHistoryComponent', () => {
  let component: ErrorsHistoryComponent;
  let fixture: ComponentFixture<ErrorsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
