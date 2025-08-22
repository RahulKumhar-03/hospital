import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNurseComponent } from './all-nurse.component';

describe('AllNurseComponent', () => {
  let component: AllNurseComponent;
  let fixture: ComponentFixture<AllNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllNurseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
