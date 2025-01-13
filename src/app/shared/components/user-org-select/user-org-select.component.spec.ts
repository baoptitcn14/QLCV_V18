import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrgSelectComponent } from './user-org-select.component';

describe('UserOrgSelectComponent', () => {
  let component: UserOrgSelectComponent;
  let fixture: ComponentFixture<UserOrgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrgSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
