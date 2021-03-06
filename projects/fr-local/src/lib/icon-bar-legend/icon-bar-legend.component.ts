import { Component, OnInit, Input } from '@angular/core';
import { IconData } from '../icon-legend/icon-data';
import { TBOManager } from 'fleetrace';

@Component({
  selector: 'fr-icon-bar-legend',
  templateUrl: './icon-bar-legend.component.html',
  styleUrls: ['./icon-bar-legend.component.scss']
})
export class IconBarLegendComponent implements OnInit {

  @Input() caption: string = '';
  @Input() bar: IconData[] = [];

  constructor(public BOManager: TBOManager) { }

  ngOnInit() {

  }

}
