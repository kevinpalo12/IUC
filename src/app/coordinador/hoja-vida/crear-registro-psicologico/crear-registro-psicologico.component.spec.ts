import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistroPsicologicoComponent } from './crear-registro-psicologico.component';

describe('CrearRegistroPsicologicoComponent', () => {
  let component: CrearRegistroPsicologicoComponent;
  let fixture: ComponentFixture<CrearRegistroPsicologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRegistroPsicologicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRegistroPsicologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
