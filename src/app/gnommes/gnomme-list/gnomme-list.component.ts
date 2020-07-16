import { Gnommes, Town } from './../../models/gnommes.interface';
import { Component, OnInit } from '@angular/core';
import { GnommesService } from './../../services/gnommes.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-gnomme-list',
  templateUrl: './gnomme-list.component.html',
  styleUrls: ['./gnomme-list.component.sass'],
})
export class GnommeListComponent implements OnInit {

  gnommes: Gnommes[];
  displayedColumns: string[] = [
    'id',
    'name',
    'thumbnail',
    'weight',
    'height',
    'hair_color',
    'professions',
    'friends'];
    selection = new SelectionModel<Gnommes>(false, []);

  constructor(private gnommeService: GnommesService) {

    this.gnommes = [];

  }

  ngOnInit(): void {

    this.gnommeService.fetchData()
    .subscribe((data: Town) => {

      this.gnommes = data.Brastlewark;

    });
  }

  handleClickRow(row: any): void {
    console.log(row);
  }

}
