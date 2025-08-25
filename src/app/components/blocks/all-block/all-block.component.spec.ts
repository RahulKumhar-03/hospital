import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBlockComponent } from './all-block.component';

describe('AllBlockComponent', () => {
  let component: AllBlockComponent;
  let fixture: ComponentFixture<AllBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
