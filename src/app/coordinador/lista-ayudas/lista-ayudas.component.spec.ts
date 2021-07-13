import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAyudasComponent } from './lista-ayudas.component';

describe('ListaAyudasComponent', () => {
  let component: ListaAyudasComponent;
  let fixture: ComponentFixture<ListaAyudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAyudasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAyudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
