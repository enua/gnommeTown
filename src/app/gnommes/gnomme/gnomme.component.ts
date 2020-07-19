import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, EventEmitter, Output } from '@angular/core';
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

  @Output()
  isClosed: EventEmitter<boolean> = new EventEmitter();

  avgGnomme: number; // %gnomme age from total
  constructor() {
    this.selected = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selected) {
      this.avgGnomme = (this.selected.age * 100) / this.maxAge;
    }
  }

  handleClose(): void {
    this.selected = null;
    this.isClosed.emit(true);
  }
}
