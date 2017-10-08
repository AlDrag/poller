import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PollService {

  private readonly baseHREF = `${environment.baseURL}/polls`;

  constructor(private http: HttpClient) { }

  get() {

  }

  create(payload: IPollPayload) {
    return this.http.post(this.baseHREF, payload);
  }
}

export interface IPollPayload {
  title: string;
  options: string[];
}
