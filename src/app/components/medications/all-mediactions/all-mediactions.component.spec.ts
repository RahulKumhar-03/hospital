import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediactionsComponent } from './all-mediactions.component';

describe('AllMediactionsComponent', () => {
  let component: AllMediactionsComponent;
  let fixture: ComponentFixture<AllMediactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMediactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMediactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
