import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { RaceDataJson, EventDataJson, ApiRetValue } from 'fr-local';

export class EventParams {
  raceCount: number;
  itCount: number;
  startlistCount: number;
}

export class TimingParams {
  race: number;
  tp: number;
  bib: number;
}

export class ConnectionStatus {
  connected: boolean;
  websockets: boolean;
}

const JsonOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

// const TextOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'text/plain; charset=utf-8'
//   }),
//   responseType: "text"
// };

class QueryOptions {
  headers: HttpHeaders;
  params: HttpParams;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getConnectionStatus(): Observable<ConnectionStatus> {
    return this.http.get<ConnectionStatus>('/api/get-input-connection-status', {});
  }

  getOpuputConnectionStatus(): Observable<ConnectionStatus> {
    return this.http.get<ConnectionStatus>('/api/get-output-connection-status', {});
  }

  inputWireConnect(): Observable<string> {
    return this.http.get('/api/input-wire-connect', { responseType: 'text' });
  }

  inputWireDisconnect(): Observable<string> {
    return this.http.get('/api/input-wire-disconnect', { responseType: 'text' });
  }

  outputWireConnect(): Observable<string> {
    return this.http.get('/api/output-wire-connect', { responseType: 'text' });
  }

  outputWireDisconnect(): Observable<string> {
    return this.http.get('/api/output-wire-disconnect', { responseType: 'text' });
  }

  queryParams(): Observable<EventParams> {
    return this.http.get<EventParams>('/api/query-params', {});
  }

  manageClear(): Observable<string> {
    return this.http.get('/api/manage-clear', { responseType: 'text' });
  }

  manageClearRace(race: number): Observable<string> {
    return this.http.get(`/api/manage-clear-race?race=${race}`, { responseType: 'text' });
  }

  manageGoBackToRace(race: number): Observable<string> {
    return this.http.get(`/api/manage-go-back-to-race?race=${race}`, { responseType: 'text' });
  }
  
  manageClearTimepoint(race: number, it: number): Observable<string> {
    return this.http.get(`/api/manage-clear-timepoint?race=${race}&it=${it}`, { responseType: 'text' });
  }

  sendTime(race: number, it: number, bib: number): Observable<string> {
    return this.http.get(`/api/widget/time?race=${race}&it=${it}&bib=${bib}`, { responseType: 'text' });
  }

  sendMsg(value: string): Observable<string> {
    return this.http.get(`/api/send-msg?value=${value}`, { responseType: 'text' });
  }

  requestNetto(): Observable<string> {
    //get-input-netto
    return this.http.get('/api/widget/netto', {responseType: 'text'});
  }

  requestOutputNetto(): Observable<string> {
    return this.http.get('/api/widget/get-output-netto', {responseType: 'text'});
  }

  requestNetto1(): Observable<string> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', 'http://localhost/3000');

    return this.http.get('api/widget/netto', {
      "headers": headers,
      "responseType": 'text'
    });
  }

  pullE(): Observable<string> {
    return this.http.get('/api/event-data', { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  pullEJ(): Observable<EventDataJson> {
    return this.http.get<EventDataJson>('/api/event-data-json', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pullRJ(race: number): Observable<RaceDataJson> {
    let p: HttpParams = new HttpParams();
    p = p.set('race', race.toString());

    const o: QueryOptions =  new QueryOptions();
    o.headers = JsonOptions.headers;
    o.params = p;

    return this.http.get<RaceDataJson>('/api/race-data-json', o)
      .pipe(
        catchError(this.handleError)
      );
  }

  pushE(value: string): Observable<ApiRetValue> {
    return this.http.post<ApiRetValue>('/api/event-data', value, JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pushEJ(value: EventDataJson): Observable<ApiRetValue> {
    return this.http.post<ApiRetValue>('/api/event-data-json', value, JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pushRJ(race: number, value: RaceDataJson): Observable<ApiRetValue> {
    let p: HttpParams = new HttpParams();
    p = p.set('race', race.toString());

    const o: QueryOptions =  new QueryOptions();
    o.headers = JsonOptions.headers;
    o.params = p;

    return this.http.post<ApiRetValue>('/api/race-data-json', value, o)
      .pipe(
        catchError(this.handleError)
      );
  }
    
  pushRD(value: RaceDataJson): Observable<ApiRetValue> {
    return this.http.post<ApiRetValue>('/api/rd.json', value, JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  pushED(value: EventDataJson): Observable<ApiRetValue> {
    return this.http.post<ApiRetValue>('/api/ed.json', value, JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  push2(value: EventDataJson): Observable<ApiRetValue> {
    return this.http.post<ApiRetValue>('/ud/2', value, JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  push3(value: RaceDataJson): Observable<ApiRetValue> {
    return this.http.post<ApiRetValue>('/ud/3', value, JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  pullED(): Observable<EventDataJson> {
    return this.http.get<EventDataJson>('/api/ed.json', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pullRD(): Observable<RaceDataJson> {
    return this.http.get<RaceDataJson>('/api/rd.json', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pull2(): Observable<EventDataJson> {
    return this.http.get<EventDataJson>('/ud/2', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  pull3(): Observable<RaceDataJson> {
    return this.http.get<RaceDataJson>('/ud/3', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBackup(): Observable<string[]> {
    return this.http.get<string[]>('/api/backup', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBacklog(): Observable<string[]> {
    return this.http.get<string[]>('/api/backlog', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBackupAndLog(): Observable<string[]> {
    return this.http.get<string[]>('/api/backup-and-log', JsonOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBackupString(): Observable<string> {
    return this.http.get('/api/backup-string', { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBacklogString(): Observable<string> {
    return this.http.get('/api/backlog-string', { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getBackupAndLogString(): Observable<string> {
    return this.http.get('/api/backup-and-log-string', { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getBackupAndLogJsonString(): Observable<string> {
    return this.http.get('/api/backup-and-log-json-string', { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * 
   * @param mode layout 1 = finish, layout 2 = points
   */
  getEventTableJson(mode: number): Observable<string> {
    return this.http.get(`/api/widget/get-event-table-json?mode=${mode}`, {responseType: 'text'});
  }

  getFinishTableJson(): Observable<string> {
    return this.http.get('/api/widget/get-finish-table-json', {responseType: 'text'});
  }

  getPointsTableJson(): Observable<string> {
    return this.http.get('/api/widget/get-points-table-json', {responseType: 'text'});
  }

  getNarrowRaceTableJson(race: number, it: number): Observable<string> {
    return this.http.get(`/api/widget/get-narrow-race-table-json?race=${race}&it=${it}`, {responseType: 'text'});
  }

  getWideRaceTableJson(race: number, it: number): Observable<string> {
    return this.http.get(`/api/widget/get-wide-race-table-json?race=${race}&it=${it}`, {responseType: 'text'});
  }

  getRaceTableJson(): Observable<string> {
    return this.http.get('/api/widget/get-race-table-json', {responseType: 'text'});
  }

  getRaceTableHtml(): Observable<string> {
    return this.http.get('/api/widget/get-race-table-html', {responseType: 'text'});
  }

  getTime(race: number, it: number, bib: number): Observable<string> {
    return this.http.get(`/api/widget/do-time?race=${race}&it=${it}&bib=${bib}`, {responseType: 'text'});
  }

  getFinish(race: number, bib: number): Observable<string> {
    return this.http.get(`/api/widget/do-finish?race=${race}&bib=${bib}`, {responseType: 'text'});
  }

  getTimeAndTable(race: number, it: number, bib: number): Observable<string> {
    return this.http.get(`/api/widget/do-time-for-table?race=${race}&it=${it}&bib=${bib}`, {responseType: 'text'});
  }

  getFinishAndTable(race: number, bib: number): Observable<string> {
    return this.http.get(`/api/widget/do-finish-for-table?race=${race}&bib=${bib}`, {responseType: 'text'});
  }

  getTimingEventForTable(race: number, it: number, bib: number, option: number, mode: number): Observable<string> {
    return this.http.get(`/api/widget/do-timing-event-for-table?race=${race}&it=${it}&bib=${bib}&option=${option}&mode=${mode}`,
      {responseType: 'text'});
  }

  getTimingEvent(race: number, it: number, bib: number, option: number): Observable<string> {
    return this.http.get(`/api/widget/do-timing-event?race=${race}&it=${it}&bib=${bib}&option=${option}`, {responseType: 'text'});
  }

  /**
   * Trigger generation of time and/or  finish position on server.
   * (This variation does not do status updates and it cannot do erasures.)
   * */
  getTimingEventQuick(race: number, it: number, bib: number, option: number): Observable<string> {
    return this.http.get(`/api/widget/do-timing-event-quick?race=${race}&it=${it}&bib=${bib}`, {responseType: 'text'});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
