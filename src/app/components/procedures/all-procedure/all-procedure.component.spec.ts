import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProcedureComponent } from './all-procedure.component';

describe('AllProcedureComponent', () => {
  let component: AllProcedureComponent;
  let fixture: ComponentFixture<AllProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProcedureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
