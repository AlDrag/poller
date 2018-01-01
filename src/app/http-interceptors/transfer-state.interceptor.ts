import { Injectable } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class TransferStateInterceptor implements HttpInterceptor {
    
    constructor(private state: TransferState) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method !== "GET") {
            return next.handle(request);
        }
        
        const STATE_KEY = makeStateKey(request.urlWithParams);
        const cachedResponse = this.state.get(STATE_KEY, null);

        if (cachedResponse) {
            return Observable.of(new HttpResponse<any>(cachedResponse));
        }
        
        return next.handle(request).do(event => {
            if (event instanceof HttpResponse) {
                this.state.set(STATE_KEY, event.clone());
            }
        });
    }
}