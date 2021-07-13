import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteEstudentInfoComponent } from './complete-estudent-info.component';

describe('CompleteEstudentInfoComponent', () => {
  let component: CompleteEstudentInfoComponent;
  let fixture: ComponentFixture<CompleteEstudentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteEstudentInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteEstudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
