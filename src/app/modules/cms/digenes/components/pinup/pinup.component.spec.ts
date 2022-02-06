import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinupComponent } from './pinup.component';

describe('PinupComponent', () => {
  let component: PinupComponent;
  let fixture: ComponentFixture<PinupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
