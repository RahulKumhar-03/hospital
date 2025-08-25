import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOnCallsComponent } from './all-on-calls.component';

describe('AllOnCallsComponent', () => {
  let component: AllOnCallsComponent;
  let fixture: ComponentFixture<AllOnCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOnCallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOnCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
