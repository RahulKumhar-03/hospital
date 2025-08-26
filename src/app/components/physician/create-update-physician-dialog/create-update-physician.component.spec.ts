import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePhysicianComponent } from './create-update-physician.component';

describe('CreateUpdatePhysicianComponent', () => {
  let component: CreateUpdatePhysicianComponent;
  let fixture: ComponentFixture<CreateUpdatePhysicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdatePhysicianComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
