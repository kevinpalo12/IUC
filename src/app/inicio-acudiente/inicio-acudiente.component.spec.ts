import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAcudienteComponent } from './inicio-acudiente.component';

describe('InicioAcudienteComponent', () => {
  let component: InicioAcudienteComponent;
  let fixture: ComponentFixture<InicioAcudienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAcudienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAcudienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
