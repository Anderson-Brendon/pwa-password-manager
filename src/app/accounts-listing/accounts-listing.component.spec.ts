import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsListingComponent } from './accounts-listing.component';

describe('AccountsListingComponent', () => {
  let component: AccountsListingComponent;
  let fixture: ComponentFixture<AccountsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
