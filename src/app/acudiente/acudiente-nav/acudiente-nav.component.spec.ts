import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcudienteNavComponent } from './acudiente-nav.component';

describe('AcudienteNavComponent', () => {
  let component: AcudienteNavComponent;
  let fixture: ComponentFixture<AcudienteNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcudienteNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcudienteNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
