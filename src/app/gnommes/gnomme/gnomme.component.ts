import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Gnommes } from 'src/app/models/gnommes.interface';

@Component({
  selector: 'app-gnomme',
  templateUrl: './gnomme.component.html',
  styleUrls: ['./gnomme.component.sass']
})
export class GnommeComponent implements OnChanges{

  @Input()
  selected: Gnommes;
  @Input()
  avgAge: number;
  @Input()
  avgHeight: number;
  @Input()
  maxAge: number;

  avgGnomme: number; // %gnomme age from total
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selected) {
      this.avgGnomme = (this.selected.age * 100) / this.maxAge;
    }
  }

  handleClose(): void {
    this.selected = null;
  }
}
