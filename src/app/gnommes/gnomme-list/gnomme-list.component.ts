import { Gnommes, Town } from './../../models/gnommes.interface';
import { Component, OnInit } from '@angular/core';
import { GnommesService } from './../../services/gnommes.service';
import { SelectionModel } from '@angular/cdk/collections';
import { map, sum, max } from 'lodash';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gnomme-list',
  templateUrl: './gnomme-list.component.html',
  styleUrls: ['./gnomme-list.component.sass'],
})
export class GnommeListComponent implements OnInit {

  gnommes: Gnommes[];
  selected: Gnommes;
  isReady: boolean;

  // Material Table data source
  gnommeSource = new MatTableDataSource(this.gnommes);

  // Material Rows
  gnommeColumns: string[] = [
    'id',
    'name',
    'age',
  ];

  // Material Filters
  nameFilter = new FormControl();

  // Single Row Selection
  selection = new SelectionModel<Gnommes>(false, []);

  avgAge: number; // the average gnomme age in Town
  maxAge: number; // the max gnomme age in Town
  avgHeight: number; // the average gnomme height in Town

  constructor(private gnommeService: GnommesService) {

    this.gnommes = [];
    this.isReady = false;

  }

  ngOnInit(): void {

    this.gnommeSource.filterPredicate = this.gnommeFilterPredicate();

    // TODO: Activate this service!!!

    this.gnommeService.fetchData()
    .subscribe((data: Town) => {

      this.gnommes = data.Brastlewark;
      this.avgAge = this.getAvgAge(this.gnommes);

      // this.avgAge = this.getAvgAge(this.gnommes);
      this.maxAge = this.getMaxAge(this.gnommes);

      // Set Material Data Table Source
      this.gnommeSource = new MatTableDataSource(this.gnommes);

      // turn off spinner
      this.isReady = true;

    });
    /* this.gnommes = [
      {
        id: 0,
        name: 'Tobus Quickwhistle',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg',
        age: 306,
        weight: 39.065952,
        height: 107.75835,
        hair_color: 'Pink',
        professions: [
          'Metalworker',
          'Woodcarver',
          'Stonecarver',
          ' Tinker',
          'Tailor',
          'Potter'
        ],
        friends: [
          'Cogwitz Chillwidget',
          'Tinadette Chillbuster'
        ]
      },
      {
        id: 1,
        name: 'Fizkin Voidbuster',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/120000/nahled/white-hen.jpg',
        age: 288,
        weight: 35.279167,
        height: 110.43628,
        hair_color: 'Green',
        professions: [
          'Brewer',
          'Medic',
          'Prospector',
          'Gemcutter',
          'Mason',
          'Tailor'
        ],
        friends: []
      },
      {
        id: 2,
        name: 'Malbin Chromerocket',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/30000/nahled/maple-leaves-background.jpg',
        age: 166,
        weight: 35.88665,
        height: 106.14395,
        hair_color: 'Red',
        professions: [
          'Cook',
          'Baker',
          'Miner'
        ],
        friends: [
          'Fizwood Voidtossle'
        ]
      },
      {
        id: 3,
        name: 'Midwig Gyroslicer',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1275919724d1Oh.jpg',
        age: 240,
        weight: 40.97596,
        height: 127.88554,
        hair_color: 'Red',
        professions: [
          'Carpenter',
          'Farmer',
          'Stonecarver',
          'Brewer',
          'Tax inspector',
          'Prospector'
        ],
        friends: [
          'Sarabink Tinkbuster',
          'Tinadette Wrongslicer'
        ]
      },
      {
        id: 4,
        name: 'Malbin Magnaweaver',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/nahled/zebra-head-11281366876AZ3M.jpg',
        age: 89,
        weight: 43.506973,
        height: 101.6974,
        hair_color: 'Black',
        professions: [
          'Smelter',
          ' Tinker'
        ],
        friends: [
          'Fizkin Fussslicer',
          'Cogwitz Chillwidget'
        ]
      },
      {
        id: 5,
        name: 'Zedkin Quickbuster',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1193219094.jpg',
        age: 273,
        weight: 38.742382,
        height: 91.54829,
        hair_color: 'Red',
        professions: [
          'Cook'
        ],
        friends: [
          'Libalia Quickbooster',
          'Whitwright Mystwhistle'
        ]
      },
      {
        id: 6,
        name: 'Emmadette Gimbalpower',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/20000/nahled/stingray.jpg',
        age: 212,
        weight: 40.681095,
        height: 98.701645,
        hair_color: 'Green',
        professions: [
          'Mason'
        ],
        friends: [
          'Ecki Gyrobuster',
          'Zedkin Nozzlespackle',
          'Milli Clankswhistle',
          'Libalia Magnatink'
        ]
      },
      {
        id: 7,
        name: 'Twizzle Chrometossle',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1275919724d1Oh.jpg',
        age: 85,
        weight: 38.953087,
        height: 96.0678,
        hair_color: 'Red',
        professions: [
          'Baker',
          'Brewer',
          'Tax inspector'
        ],
        friends: [
          'Libalia Mystbooster',
          'Zedkin Gyrotorque'
        ]
      },
      {
        id: 8,
        name: 'Malbert Tinkbuster',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/10000/velka/1-1248161543llOC.jpg',
        age: 186,
        weight: 41.159805,
        height: 118.27941,
        hair_color: 'Gray',
        professions: [
          'Baker',
          'Mason'
        ],
        friends: []
      },
      {
        id: 9,
        name: 'Kinthony Nozzlebooster',
        thumbnail: 'http://www.publicdomainpictures.net/pictures/20000/nahled/baby-lamb.jpg',
        age: 233,
        weight: 41.024612,
        height: 113.56545,
        hair_color: 'Red',
        professions: [
          'Smelter',
          'Miner',
          'Tax inspector',
          'Carpenter'
        ],
        friends: [
          'Zedkin Clankstorque',
          'Midwig Magnarivet'
        ]
      }
    ];

    this.avgAge = this.getAvgAge(this.gnommes);

    // this.avgAge = this.getAvgAge(this.gnommes);
    this.maxAge = this.getMaxAge(this.gnommes);

    // Set Material Data Table Source
    this.gnommeSource = new MatTableDataSource(this.gnommes); */

  }

  getAvgAge(gnommesList: Gnommes[]): number {
    return sum(map(gnommesList, 'age')) / gnommesList.length;
  }

  getMaxAge(gnommesList: Gnommes[]): number {
    return max(map(gnommesList, 'age'));
  }

  handleClick(row: Gnommes): void {
    this.selected = row;
  }

  // gnommeFilterPredicate: required by Material as custom filter predicate
  gnommeFilterPredicate(): any {
    const gnommesFiltered = (data: Gnommes, filter: string) => {
      // Set as table local documentation
      const dataStr = Object.keys(data).reduce((currentTerm, key) => {
        return currentTerm + data[key] + '◬';
      }, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    return gnommesFiltered;
  }

  // custom filter
  gnommeFilter(filterValue: string): void {
    const filter = {
      name: filterValue.trim().toLocaleLowerCase(),
    };
    this.gnommeSource.filter = filterValue;
    console.log(this.gnommeSource);
  }

}
