import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertMedicationsDialogComponent } from './upsert-medications-dialog.component';

describe('UpsertMedicationsDialogComponent', () => {
  let component: UpsertMedicationsDialogComponent;
  let fixture: ComponentFixture<UpsertMedicationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertMedicationsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertMedicationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
