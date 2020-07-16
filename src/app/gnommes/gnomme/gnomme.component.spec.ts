import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnommeComponent } from './gnomme.component';

describe('GnommeComponent', () => {
  let component: GnommeComponent;
  let fixture: ComponentFixture<GnommeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnommeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GnommeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
