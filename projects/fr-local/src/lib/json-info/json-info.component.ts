import { Component, OnInit, Input } from '@angular/core';
import { TBOManager } from 'fleetrace';
import {EventDataJson, EventParamsJson, EventPropsJson, NameTableJson, StartListJson, FinishInfoJson, FleetListJson } from '../shared/data-model';
import { TExcelExporter } from 'fleetrace';
import { JsonInfo } from '../shared/data-array';

@Component({
  selector: 'fr-json-info',
  templateUrl: './json-info.component.html',
  styleUrls: ['./json-info.component.css']
})
export class JsonInfoComponent implements OnInit {

  @Input() race: number = 1;

  output: any = 'Json Output to be shown here.';

  ee: TExcelExporter;

  jsonInfo: JsonInfo;

  constructor(public BOManager: TBOManager) {
    this.ee = new TExcelExporter();
    this.jsonInfo = new JsonInfo(BOManager);
  }

  ngOnInit() {

  }

  eventParams() {
    let o: EventParamsJson = new EventParamsJson;
    o.EventParams = this.jsonInfo.getEventParams();
    this.output = o;
  }

  eventProps() {
    let o: EventPropsJson = new EventPropsJson;
    o.EventProps = this.jsonInfo.getEventProps();
    this.output = o;
  }

  nameTable() {
    let o: NameTableJson = new NameTableJson;
    o.NameTable = this.jsonInfo.getNames();
    this.output = o;
  }

  startList(): void {
    let o: StartListJson = new StartListJson;
    o.StartList = this.jsonInfo.getStartList();
    this.output = o;
  }

  finishList(): void {
    let o: FinishInfoJson = new FinishInfoJson;
    o.FinishInfo = this.jsonInfo.getFinishList();
    this.output = o;
  }

  fleetList(): void {
    let o: FleetListJson = new FleetListJson;
    o.FleetList = this.jsonInfo.getFleetList();
    this.output = o;
  }

  timeList(): void {
    let bo = this.BOManager.BO;
    if (bo.BOParams.ITCount > 0 || bo.EventProps.IsTimed) {
      this.output = this.jsonInfo.getTL(this.race);
    }
    else {
      this.output = "no timing";
    }
  }

  timeLists(): void {
    let bo = this.BOManager.BO;
    if (bo.BOParams.ITCount > 0 || bo.EventProps.IsTimed) {
      this.output = this.jsonInfo.getTimeLists();
    }
    else {
      this.output = "no timing";
    }
  }

  penaltyList(): void {
    let a = this.jsonInfo.getPL(this.race);
    a.unshift("PenaltyList.Begin.R" + this.race);
    a.push("PenaltyList.End.R" + this.race);
    let o: { [index: string]: string[] } = {};
    o["R" + this.race] = a;
    this.output = o;
  }

  penaltyLists(): void {
    this.output = this.jsonInfo.getPenaltyLists();
  }

  raceData(): void {
    this.output = this.jsonInfo.getRaceDataJson(this.race);
  }

  eventData(): void {
    this.output = this.jsonInfo.getEventDataJson();
  }

  eventDataArray() {
    let includeEmptyList = false;

    let o: EventDataJson = this.jsonInfo.getEventDataJson();
    let a: string[] = [];

    for (let s of o.EventParams)
      a.push(s);

    for (let s of o.EventProps)
      a.push(s);

    if (o.NameTable.length > 2 || includeEmptyList)
      for (let s of o.NameTable)
        a.push(s);

    for (let s of o.StartList)
      a.push(s);

    if (o.FleetList.length > 2 || includeEmptyList)
      for (let s of o.FleetList)
        a.push(s);

    for (let s of o.FinishInfo)
      a.push(s);

    if (o.TimingInfo.length > 0)
      for (let ti of o.TimingInfo)
        for (let s of ti)
          a.push(s);

    if (o.PenaltyInfo.length > 0)
      for (let pi of o.PenaltyInfo) {
        if (pi.length > 0)
          for (let s of pi)
            a.push(s);
      }

    this.output = a;
  }

}
