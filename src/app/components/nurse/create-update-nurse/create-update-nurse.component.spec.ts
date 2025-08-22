import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateNurseComponent } from './create-update-nurse.component';

describe('CreateUpdateNurseComponent', () => {
  let component: CreateUpdateNurseComponent;
  let fixture: ComponentFixture<CreateUpdateNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateNurseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
