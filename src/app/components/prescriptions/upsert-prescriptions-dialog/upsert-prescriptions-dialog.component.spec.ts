import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPrescriptionsDialogComponent } from './upsert-prescriptions-dialog.component';

describe('UpsertPrescriptionsDialogComponent', () => {
  let component: UpsertPrescriptionsDialogComponent;
  let fixture: ComponentFixture<UpsertPrescriptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertPrescriptionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertPrescriptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
