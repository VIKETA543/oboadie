import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wearhousemanager } from './wearhousemanager';

describe('Wearhousemanager', () => {
  let component: Wearhousemanager;
  let fixture: ComponentFixture<Wearhousemanager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wearhousemanager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wearhousemanager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
