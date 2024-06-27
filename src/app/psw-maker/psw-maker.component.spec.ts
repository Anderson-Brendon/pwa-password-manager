import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PswMakerComponent } from './psw-maker.component';

describe('PswMakerComponent', () => {
  let component: PswMakerComponent;
  let fixture: ComponentFixture<PswMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PswMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PswMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
