import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productbrand } from './productbrand';

describe('Productbrand', () => {
  let component: Productbrand;
  let fixture: ComponentFixture<Productbrand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productbrand]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productbrand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
