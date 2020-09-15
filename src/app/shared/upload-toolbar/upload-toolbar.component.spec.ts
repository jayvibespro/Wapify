import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadToolbarComponent } from './upload-toolbar.component';

describe('UploadToolbarComponent', () => {
  let component: UploadToolbarComponent;
  let fixture: ComponentFixture<UploadToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
