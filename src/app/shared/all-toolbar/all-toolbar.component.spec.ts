import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToolbarComponent } from './all-toolbar.component';

describe('AllToolbarComponent', () => {
  let component: AllToolbarComponent;
  let fixture: ComponentFixture<AllToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
