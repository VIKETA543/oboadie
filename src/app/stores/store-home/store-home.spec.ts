import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHome } from './store-home';

describe('PosHome', () => {
  let component: StoreHome;
  let fixture: ComponentFixture<StoreHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
