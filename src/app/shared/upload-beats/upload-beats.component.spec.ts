import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBeatsComponent } from './upload-beats.component';

describe('UploadBeatsComponent', () => {
  let component: UploadBeatsComponent;
  let fixture: ComponentFixture<UploadBeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
