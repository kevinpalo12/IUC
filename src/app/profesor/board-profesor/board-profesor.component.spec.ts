import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardProfesorComponent } from './board-profesor.component';

describe('BoardProfesorComponent', () => {
  let component: BoardProfesorComponent;
  let fixture: ComponentFixture<BoardProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
