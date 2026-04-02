import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Targetgroup } from './targetgroup';

describe('Targetgroup', () => {
  let component: Targetgroup;
  let fixture: ComponentFixture<Targetgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Targetgroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Targetgroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
