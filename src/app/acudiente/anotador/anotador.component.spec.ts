import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotadorComponent } from './anotador.component';

describe('AnotadorComponent', () => {
  let component: AnotadorComponent;
  let fixture: ComponentFixture<AnotadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnotadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
