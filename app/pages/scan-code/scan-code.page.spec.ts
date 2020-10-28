import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanCodePage } from './scan-code.page';

describe('ScanCodePage', () => {
  let component: ScanCodePage;
  let fixture: ComponentFixture<ScanCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanCodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
