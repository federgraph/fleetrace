import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TBOManager } from 'fleetrace';
import { TEventRaceEntry } from 'fleetrace';

@Component({
  selector: 'fr-bib-tab',
  templateUrl: './bib.component.html',
  styleUrls: ['./bib.component.css']
})
export class BibComponent implements OnInit {

  @Input() bib: number = 0;

  dn: string = "";
  nc: string = "";
  series: string = "";
  result: number = 0;

  constructor(public BOManager: TBOManager) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }

  clear() {
    this.dn = "";
    this.nc = "";
    this.series = "";
    this.result = 0;
  }

  update() {
    let cr = this.BOManager.BO.EventNode.FindBib(this.bib);
    if (!cr)
      this.clear();
    else {
      this.dn = cr.DN;
      this.nc = cr.NC;
      this.result = cr.GPosR;
      let t = '';
      let ere: TEventRaceEntry;
      for (let r = 1; r < cr.Race.length; r++) {
        ere = cr.Race[r];
        if (r > 1)
          t += '-'
        //t += ere.OTime;
        t += ere.RaceValue;
      }
      this.series = t;
    }
  }

}
