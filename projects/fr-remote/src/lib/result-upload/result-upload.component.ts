import { Component, OnInit, Input } from '@angular/core';
import { TBOManager } from 'fleetrace';
import { JsonInfo, RaceDataJson } from 'fr-local';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'fr-result-upload',
  templateUrl: './result-upload.component.html',
  styleUrls: ['./result-upload.component.scss']
})
export class ResultUploadComponent implements OnInit {

  @Input() race: number = 1;

  Info: string = "info";
  TestOutput: any = '';

  jsonInfo: JsonInfo;

  constructor(public BOManager: TBOManager,
    private apiService: ApiService) {
    this.jsonInfo = new JsonInfo(BOManager);
  }

  ngOnInit() {
    this.clear();
  }

  show() {
    this.Info = `show() called for race ${this.race}`;
    this.TestOutput = this.jsonInfo.getRaceDataJson(this.race);
  }

  post() {
    this.Info = `post() called for race ${this.race}`;
    let t: RaceDataJson = this.jsonInfo.getRaceDataJson(this.race);
    this.apiService.push3(t).subscribe(data => this.TestOutput = data.retvalue);
  }

  clear() {
    this.Info = 'info';
    this.TestOutput = 'Json Preview to be shown here.';
  }

}
