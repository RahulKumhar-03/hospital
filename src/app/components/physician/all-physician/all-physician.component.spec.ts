import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPhysicianComponent } from './all-physician.component';

describe('AllPhysicianComponent', () => {
  let component: AllPhysicianComponent;
  let fixture: ComponentFixture<AllPhysicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPhysicianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
