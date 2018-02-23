import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class PollService {

  private readonly baseHREF = `${environment.baseURL}/polls`;

  constructor(private http: HttpClient) { }

  create(payload: IPollPayload): Observable<IPollResponse> {
    return this.http.post(this.baseHREF, payload)
      .pipe(
        map(response => response as IPollResponse)
      );
  }

  getPoll(uuid: string): Observable<IPollResponse> {
    return this.http.get(`${this.baseHREF}/${uuid}`)
      .pipe(
        catchError(e => Observable.of(e)),
        switchMap((x: IPollResponse | HttpErrorResponse) => {
          if (x instanceof HttpErrorResponse) {
            return Observable.of({status: 'failed', data: {id: 0, title: '', uuid: ''}});
          } else {
            return this.http.get(`${this.baseHREF}/${x.data[0].id}/options`)
              .pipe(
                map((options: IPollResponse) => {
                  const pollData = x.data[0];
                  return {
                    status: options.status,
                    data: {
                      id: pollData.id,
                      title: pollData.title,
                      uuid: pollData.uuid,
                      options: options.data
                    }
                  };
                })
              );
          }
        })
      );
  }

  getResults(uuid: string) {
    return this.http.get(`${this.baseHREF}/${uuid}/results`);
  }

  vote(pollID, optionID): Observable<IPollResponse> {
    return this.http.post(`${this.baseHREF}/${pollID}/options/${optionID}/votes`, {})
      .pipe(
        map(response => response as IPollResponse)
      );
  }
}

export interface IPollPayload {
  title: string;
  options: string[];
}

export interface IPollResponse {
  data: IPollData,
  status: string
}

export interface IPollData {
  id: number,
  options?: {id: number, description: string, poll_id: number}[],
  title: string,
  uuid: string
}

export interface IVoteData {
  id: number,
  option_id: number,
  poll_id: number
}