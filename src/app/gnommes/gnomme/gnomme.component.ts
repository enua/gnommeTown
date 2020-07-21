import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Gnommes } from 'src/app/models/gnommes.interface';
import { words } from 'lodash';

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
  isClosed: EventEmitter<null> = new EventEmitter();

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
    this.isClosed.emit();
  }

  getGender(): string {
    const pattern = '^[aeiouAEIOU]{1}[A-Za-z]*';
    const fullName: string[] = words(this.selected.name);
    const letter: string = fullName[0].substring(fullName[0].length - 1);
    if (letter.match(pattern)) {
      return 'Female';
    } else {
      return 'Male';
    }
  }
}
