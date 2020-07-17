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
      console.log('ready')
      // TODO set de % of avg age
      console.log(this.selected.age)
      console.log(this.maxAge)
      this.avgGnomme = (this.selected.age * 100) / this.maxAge;
      // TODO set de % of gnomme age
      console.log(this.avgGnomme)
    }
  }
  handleClose(): void {
    this.selected = null;
  }
}
