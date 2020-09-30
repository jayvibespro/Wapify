import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUploadsComponent } from './all-uploads.component';

describe('AllUploadsComponent', () => {
  let component: AllUploadsComponent;
  let fixture: ComponentFixture<AllUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
