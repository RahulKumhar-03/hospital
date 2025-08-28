import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianDetailDialogComponent } from './physician-detail-dialog.component';

describe('PhysicianDetailDialogComponent', () => {
  let component: PhysicianDetailDialogComponent;
  let fixture: ComponentFixture<PhysicianDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicianDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicianDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
