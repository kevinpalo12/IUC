import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcudidosComponent } from './acudidos.component';

describe('AcudidosComponent', () => {
  let component: AcudidosComponent;
  let fixture: ComponentFixture<AcudidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcudidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcudidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
