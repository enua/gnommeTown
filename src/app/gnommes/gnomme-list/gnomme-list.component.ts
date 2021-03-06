import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { map, sum, max, shuffle, size } from 'lodash';
import { Observable } from 'rxjs';
import { Gnommes, Town } from './../../models/gnommes.interface';
import { GnommesService } from './../../services/gnommes.service';

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

  errorData: string;


  constructor(private gnommeService: GnommesService) {

    this.gnommes = [];
    this.isReady = false;
    this.errorData = null;

  }

  ngOnInit(): void {

    this.observeFetchData().subscribe(
      (data: Town) => {
        // data with random
        this.gnommes = shuffle(data.Brastlewark);

        // turn off spinner
        this.isReady = true;
      },
      (error: Error) => {
        console.log(error)
        this.errorData = error.message;
        // stop the spinner
        this.isReady = true;
      },
      () => {
        this.avgAge = this.getAvgAge(this.gnommes);

        // this.avgAge = this.getAvgAge(this.gnommes);
        this.maxAge = this.getMaxAge(this.gnommes);

        // Set Material Data Table Source
        this.gnommeSource = new MatTableDataSource(this.gnommes);
        this.gnommeSource.sort = this.sort;
        this.gnommeSource.paginator = this.paginator;
        this.gnommeSource.filterPredicate = this.gnommeFilterPredicate();
      }
    );
  }

  observeFetchData(): Observable<Town> {
    return this.gnommeService.fetchData();
  }

  getAvgAge(gnommesList: Gnommes[]): number {
    return sum(map(gnommesList, 'age')) / (size(gnommesList) > 0 ? size(gnommesList) : 1);
  }

  getMaxAge(gnommesList: Gnommes[]): number {
    return max(map(gnommesList, 'age'));
  }

  handleClick(ev: MouseEvent, row: Gnommes): void {
    this.selection.toggle(row);
    this.selected = row;
  }

  handleClosed(): void {
    this.selected = null;
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
