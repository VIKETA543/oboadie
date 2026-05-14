import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectUser } from './redirect-user';

describe('RedirectUser', () => {
  let component: RedirectUser;
  let fixture: ComponentFixture<RedirectUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedirectUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
