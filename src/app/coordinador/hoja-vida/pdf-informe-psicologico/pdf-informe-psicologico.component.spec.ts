import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfInformePsicologicoComponent } from './pdf-informe-psicologico.component';

describe('PdfInformePsicologicoComponent', () => {
  let component: PdfInformePsicologicoComponent;
  let fixture: ComponentFixture<PdfInformePsicologicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfInformePsicologicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfInformePsicologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
