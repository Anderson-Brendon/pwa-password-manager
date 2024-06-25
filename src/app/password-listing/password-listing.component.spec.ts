import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordListingComponent } from './password-listing.component';

describe('PasswordListingComponent', () => {
  let component: PasswordListingComponent;
  let fixture: ComponentFixture<PasswordListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
