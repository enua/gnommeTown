import { Component, Input, OnChanges, SimpleChange, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { words } from 'lodash';
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
  isClosed: EventEmitter<null> = new EventEmitter();

  percentGnommeAge: number; // %gnomme age from total

  constructor() {
    this.selected = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selected) {
      this.percentGnommeAge = (this.selected.age * 100) / this.maxAge;
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
