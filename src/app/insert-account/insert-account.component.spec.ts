import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAccountComponent } from './insert-account.component';

describe('InsertAccountComponent', () => {
  let component: InsertAccountComponent;
  let fixture: ComponentFixture<InsertAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
