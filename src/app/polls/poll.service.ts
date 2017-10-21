import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class PollService {

  private readonly baseHREF = `${environment.baseURL}/polls`;

  constructor(private http: HttpClient) { }

  get() {

  }

  create(payload: IPollPayload): Observable<IPollResponse> {
    return this.http.post(this.baseHREF, payload).map(response => response as IPollResponse);
  }

  getPoll(uuid: string) {
    return this.http.get(`${this.baseHREF}/${uuid}`).mergeMap((x: any) => {
      return this.http.get(`${this.baseHREF}/${x.data[0].id}/options`)
        .map((options: any) => {
          return {...x.data[0], options: options.data};
        });
    });
  }

  getResults(uuid: string) {
    return this.http.get(`${this.baseHREF}/${uuid}/results`);
  }

  vote(pollID, optionID) {
    return this.http.post(`${this.baseHREF}/${pollID}/options/${optionID}/votes`, {});
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
  options: {id: number, description: string, poll_id: number}[],
  title: string,
  uuid: string
}
