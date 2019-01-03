import { TBOManager } from 'fleetrace';
import { EventParamJson, EventPropJson, EventDataJson, RaceDataJson } from './data-model';
import { TableID } from 'fleetrace';
import { TExcelExporter } from 'fleetrace';
import { TStringList } from 'fleetrace';

export class JsonInfo {

  ee: TExcelExporter;

  constructor(public BOManager: TBOManager) {
    this.ee = new TExcelExporter();
  }

  private updateParamJson(o: EventParamJson): void {
    o.RaceCount = this.BOManager.BO.BOParams.RaceCount;
    o.ITCount = this.BOManager.BO.BOParams.ITCount;
    o.StartlistCount = this.BOManager.BO.BOParams.StartlistCount;
  }

  private updatePropJson(o: EventPropJson): void {
    o.Name = this.BOManager.BO.EventProps.EventName;
    //o.ScoringSystem = this.BOManager.BO.EventProps.ScoringSystem;
    o.Throwouts = this.BOManager.BO.EventProps.Throwouts;
    o.DivisionName = this.BOManager.BO.EventProps.DivisionName;
    //o.InputMode = this.BOManager.BO.EventProps.InputMode;
    o.RaceLayout = this.BOManager.BO.EventProps.RaceLayout;
    o.NameSchema = this.BOManager.BO.EventProps.NameSchema;
    o.FieldMap = this.BOManager.BO.EventProps.FieldMap;
    o.FieldCaptions = this.BOManager.BO.EventProps.FieldCaptions;

    //o.FieldCount = this.BOManager.BO.EventProps.FieldCount;
    o.FieldCount = this.BOManager.BO.StammdatenNode.Collection.FieldCount;

    //o.NameFieldCount = this.BOManager.BO.EventProps.NameFieldCount;

    o.NameFieldOrder = this.BOManager.BO.EventProps.NameFieldOrder;
    o.UseFleets = this.BOManager.BO.EventProps.UseFleets;
    o.TargetFleetSize = this.BOManager.BO.EventProps.TargetFleetSize;
    o.FirstFinalRace = this.BOManager.BO.EventProps.FirstFinalRace;
    o.IsTimed = this.BOManager.BO.EventProps.IsTimed;
    o.UseCompactFormat = this.BOManager.BO.EventProps.UseCompactFormat
  }

  getEventParams(): string[] {
    let o = new EventParamJson();
    this.updateParamJson(o);
    return o.toArray();
  }

  getEventProps(): string[] {
    let o = new EventPropJson();
    this.updatePropJson(o);
    return o.toArray();
  }

  getNames(): string[] {
    let Memo = new TStringList();
    this.ee.AddSection(TableID.NameList, this.BOManager.BO, Memo);
    let SL: string[] = [];
    for (let i = 0; i < Memo.Count; i++) {
      if (Memo.SL[i])
        SL.push(Memo.SL[i]);
    }
    return Memo.SL;
  }

  getStartList(): string[] {
    let Memo = new TStringList();
    this.ee.AddSection(TableID.StartList, this.BOManager.BO, Memo);
    let SL: string[] = [];
    for (let i = 0; i < Memo.Count; i++) {
      if (Memo.SL[i])
        SL.push(Memo.SL[i]);
    }
    return Memo.SL;
  }

  getFleetList(): string[] {
    let bo = this.BOManager.BO;
    //if (bo.EventProps.UseFleets) {
    if (bo.EventNode.UseFleets) {
      let Memo = new TStringList();
      this.ee.AddSection(TableID.FleetList, bo, Memo);
      let SL: string[] = [];
      for (let i = 0; i < Memo.Count; i++) {
        if (Memo.SL[i])
          SL.push(Memo.SL[i]);
      }
      return Memo.SL;
    }
    else {
      return [];
    }
  }

  getRaceFinishList(r: number): string[] {
    let Memo = new TStringList();
    this.ee.AddRaceFinishSection(this.BOManager.BO, Memo, r);
    let SL: string[] = [];
    for (let i = 0; i < Memo.Count; i++) {
      if (Memo.SL[i])
        SL.push(Memo.SL[i]);
    }
    return Memo.SL;
  }

  getFinishList(): string[] {
    let Memo = new TStringList();
    this.ee.AddSection(TableID.FinishList, this.BOManager.BO, Memo);
    let SL: string[] = [];
    for (let i = 0; i < Memo.Count; i++) {
      if (Memo.SL[i])
        SL.push(Memo.SL[i]);
    }
    return Memo.SL;
  }

  getTL(r: number): string[] {
    let bo = this.BOManager.BO;
    let Memo = new TStringList();
    this.ee.AddTimingSection(bo, Memo, r);
    let SL: string[] = [];
    for (let i = 0; i < Memo.Count; i++) {
      if (Memo.SL[i])
        SL.push(Memo.SL[i]);
    }
    return SL;
  }

  getPL(r: number): string[] {
    let bo = this.BOManager.BO;
    if (r > 0 && r <= bo.BOParams.RaceCount) {
      let Memo = new TStringList();
      //Memo.Add(`PenaltyList.Begin.R${r}`);
      bo.BackupPenalties(Memo, r);
      //Memo.Add(`PenaltyList.End.R${r}`);
      return Memo.SL;
    }
    else {
      return [];
    }
  }

  getTimeLists(): Array<Array<string>> {
    let bo = this.BOManager.BO;
    if (bo.BOParams.ITCount > 0 || bo.EventProps.IsTimed) {
      let a = [];
      for (let r = 1; r <= bo.BOParams.RaceCount; r++) {
        a.push(this.getTL(r));
      }
      return a;
    }
    return null;
  }

  getPenaltyLists(): Array<Array<string>> {
    let bo = this.BOManager.BO;
    let a = [];
    for (let r = 1; r <= bo.BOParams.RaceCount; r++) {
      a.push(this.getPL(r));
    }                           
    return a;
  }

  getPenaltyInfo(): object {
    let bo = this.BOManager.BO;
    let a: { [index: string]: string[] } = {};
    for (let r = 1; r <= bo.BOParams.RaceCount; r++) {
      a["R" + r] = this.getPL(r);
    }
    return a;
  }

  getEventDataJson(): EventDataJson {
    let bo = this.BOManager.BO;
    let o: EventDataJson = new EventDataJson;
    let temp: any;

    o.EventParams = this.getEventParams();
    o.EventProps = this.getEventProps();
    o.NameTable = this.getNames();
    o.StartList = this.getStartList();
    o.FleetList = this.getFleetList();
    o.FinishInfo = this.getFinishList();

    if (bo.BOParams.ITCount > 0 || bo.EventProps.IsTimed) {
      temp = this.getTimeLists();
      if (temp)
        o.TimingInfo = temp;
    }

    o.PenaltyInfo = this.getPenaltyLists();
    return o;
  }

  getRaceDataJson(r: number): RaceDataJson {
    let o: RaceDataJson = new RaceDataJson;
    o.FinishInfo = this.getRaceFinishList(r);
    o.TimingInfo = this.getTL(r);
    o.PenaltyInfo = this.getPL(r);
    return o;
  }

  getRaceData(r: number): string[] {
    let o: RaceDataJson = this.getRaceDataJson(r);
    return this.convertRaceDataJson(o);
  }

  convertRaceDataJson(o: RaceDataJson): string[] {
    let a: string[] = [];

    for (let s of o.FinishInfo)
      a.push(s);

    for (let s of o.TimingInfo)
      a.push(s);

    for (let s of o.PenaltyInfo)
      a.push(s);

    return a;
  }

  getEventData(): string[] {
    let o: EventDataJson = this.getEventDataJson();
    return this.convertEventDataJson(o, false);
  }

  convertEventDataJson(o: EventDataJson, includeEmptyList: boolean = false): string[] {
  
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

    return a;
  }

}
