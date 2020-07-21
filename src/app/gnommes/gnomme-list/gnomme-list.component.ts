import { Gnommes, Town } from './../../models/gnommes.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GnommesService } from './../../services/gnommes.service';
import { SelectionModel } from '@angular/cdk/collections';
import { map, sum, max, shuffle } from 'lodash';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gnomme-list',
  templateUrl: './gnomme-list.component.html',
  styleUrls: ['./gnomme-list.component.sass'],
})
export class GnommeListComponent implements OnInit {

  gnommes: Gnommes[];
  selected: Gnommes;
  isReady: boolean;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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

    this.gnommeService.fetchData()
      .subscribe((data: Town) => {

        // data with random
        this.gnommes = shuffle(data.Brastlewark);
        this.avgAge = this.getAvgAge(this.gnommes);

        // this.avgAge = this.getAvgAge(this.gnommes);
        this.maxAge = this.getMaxAge(this.gnommes);

        // Set Material Data Table Source
        this.gnommeSource = new MatTableDataSource(this.gnommes);
        this.gnommeSource.sort = this.sort;
        this.gnommeSource.paginator = this.paginator;
        this.gnommeSource.filterPredicate = this.gnommeFilterPredicate();

        // turn off spinner
        this.isReady = true;

    });
  }

  getAvgAge(gnommesList: Gnommes[]): number {
    return sum(map(gnommesList, 'age')) / gnommesList.length;
  }

  getMaxAge(gnommesList: Gnommes[]): number {
    return max(map(gnommesList, 'age'));
  }

  handleClick(ev: MouseEvent, row: Gnommes): void {
    this.selection.toggle(row);
    this.selected = row;
  }

  isClosed(ev: boolean): void {
    this.selected = ev ? null : this.selected;
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

    this.gnommeSource.filter = filter.name;
  }

}
