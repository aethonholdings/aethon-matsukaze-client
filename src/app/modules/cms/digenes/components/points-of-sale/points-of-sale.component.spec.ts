import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfSaleComponent } from './points-of-sale.component';

describe('PointsOfSaleComponent', () => {
  let component: PointsOfSaleComponent;
  let fixture: ComponentFixture<PointsOfSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsOfSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
