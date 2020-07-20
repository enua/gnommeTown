import { HttpClientModule } from '@angular/common/http';
import { GnommesService } from './../../services/gnommes.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnommeListComponent } from './gnomme-list.component';
import { Gnommes } from 'src/app/models/gnommes.interface';

describe('GnommeListComponent', () => {
  let component: GnommeListComponent;
  let fixture: ComponentFixture<GnommeListComponent>;
  let service: GnommesService;

  const gnommesList: Gnommes[] = [
    {id: 1, name: 'test01', age: 10, thumbnail: '', weight: 0, height: 1, hair_color: '', professions: [], friends: []},
    {id: 2, name: 'test02', age: 20, thumbnail: '', weight: 1, height: 2, hair_color: '', professions: [], friends: []},
    {id: 3, name: 'test03', age: 30, thumbnail: '', weight: 2, height: 3, hair_color: '', professions: [], friends: []},
    {id: 4, name: 'test04', age: 40, thumbnail: '', weight: 3, height: 4, hair_color: '', professions: [], friends: []},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnommeListComponent ],
      imports: [HttpClientModule]
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

  describe('getAvgAge', () => {
    it('should return the avg age from data', () => {
      expect(component.getAvgAge(gnommesList)).toBe(25);
    });
  });

  describe('getMaxAge', () => {
    it('should return the max age from data', () => {
      expect(component.getMaxAge(gnommesList)).toBe(40);
    });
  });
});
