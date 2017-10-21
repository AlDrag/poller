import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PollService } from './poll.service';

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
});
