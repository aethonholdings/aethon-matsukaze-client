import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinupsComponent } from './pinups.component';

describe('PinupsComponent', () => {
  let component: PinupsComponent;
  let fixture: ComponentFixture<PinupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
