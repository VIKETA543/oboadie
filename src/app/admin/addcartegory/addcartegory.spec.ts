import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcartegory } from './addcartegory';

describe('Addcartegory', () => {
  let component: Addcartegory;
  let fixture: ComponentFixture<Addcartegory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addcartegory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addcartegory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
