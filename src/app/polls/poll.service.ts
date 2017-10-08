import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PollService {

  private readonly baseHREF = `${environment.baseURL}/polls`;

  constructor(private http: HttpClient) { }

  get() {

  }

  create(payload: IPollPayload) {
    return this.http.post(this.baseHREF, payload);
  }

  getPoll(uuid: string) {
    return this.http.get(`${this.baseHREF}/${uuid}`).mergeMap((x: any) => {
      return this.http.get(`${this.baseHREF}/${x.data[0].id}/options`)
        .map((options: any) => {
          return {...x.data[0], options: options.data};
        });
    });
  }

  vote(pollID, optionID) {
    return this.http.post(`${this.baseHREF}/${pollID}/options/${optionID}/votes`, {});
  }
}

export interface IPollPayload {
  title: string;
  options: string[];
}
