import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admhome } from './admhome';

describe('Admhome', () => {
  let component: Admhome;
  let fixture: ComponentFixture<Admhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
