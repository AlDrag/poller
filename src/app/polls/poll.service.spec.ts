import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

import { PollService, IPollResponse } from './poll.service';

describe('PollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PollService]
    });
  });

  it('should be created', inject([PollService], (service: PollService) => {
    expect(service).toBeTruthy();
  }));

  it('should send create request', inject([PollService, HttpClient, HttpTestingController], (pollService: PollService, http: HttpClient, backend: HttpTestingController) => {
    const mockResponse: IPollResponse = {
      data: {
        id: 1,
        title: 'Test Poll',
        uuid: 'gfdoug4fv4',
        options: []
      },
      status: 'success'
    }

    pollService.create({title: 'Test Poll', options: ['Test Option 1']}).subscribe((response: IPollResponse) => {
      expect(response).toEqual(mockResponse);
    });

    const mockReq = backend.expectOne(`${environment.baseURL}/polls`);
    
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    
    mockReq.flush(mockResponse);
    
    backend.verify();
  }));
});
