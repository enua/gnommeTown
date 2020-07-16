import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnommeListComponent } from './gnomme-list.component';

describe('GnommeListComponent', () => {
  let component: GnommeListComponent;
  let fixture: ComponentFixture<GnommeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnommeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GnommeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
