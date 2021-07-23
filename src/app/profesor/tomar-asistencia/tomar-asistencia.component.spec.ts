import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarAsistenciaComponent } from './tomar-asistencia.component';

describe('TomarAsistenciaComponent', () => {
  let component: TomarAsistenciaComponent;
  let fixture: ComponentFixture<TomarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomarAsistenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
