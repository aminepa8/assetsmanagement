import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionPage } from './intervention.page';

describe('InterventionPage', () => {
  let component: InterventionPage;
  let fixture: ComponentFixture<InterventionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
