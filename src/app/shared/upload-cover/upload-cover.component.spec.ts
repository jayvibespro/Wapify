import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCoverComponent } from './upload-cover.component';

describe('UploadCoverComponent', () => {
  let component: UploadCoverComponent;
  let fixture: ComponentFixture<UploadCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
