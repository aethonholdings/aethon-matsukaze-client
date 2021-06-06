import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPackageComponent } from './asset-package.component';

describe('AssetPackageComponent', () => {
  let component: AssetPackageComponent;
  let fixture: ComponentFixture<AssetPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
