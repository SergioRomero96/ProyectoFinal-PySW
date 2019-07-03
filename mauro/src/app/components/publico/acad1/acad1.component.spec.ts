import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Acad1Component } from './acad1.component';

describe('Acad1Component', () => {
  let component: Acad1Component;
  let fixture: ComponentFixture<Acad1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Acad1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Acad1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
