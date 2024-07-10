import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserConfigsComponent } from './dialog-user-configs.component';

describe('DialogUserConfigsComponent', () => {
  let component: DialogUserConfigsComponent;
  let fixture: ComponentFixture<DialogUserConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUserConfigsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUserConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
