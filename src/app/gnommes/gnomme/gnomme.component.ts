import { Component, OnInit, Input } from '@angular/core';
import { Gnommes } from 'src/app/models/gnommes.interface';

@Component({
  selector: 'app-gnomme',
  templateUrl: './gnomme.component.html',
  styleUrls: ['./gnomme.component.sass']
})
export class GnommeComponent {

  @Input()
  selected: Gnommes;
  @Input()
  avgAge: number;
  @Input()
  avgHeight: number;

  constructor() { }

  handleClose(): void {
    this.selected = null;
  }
}
