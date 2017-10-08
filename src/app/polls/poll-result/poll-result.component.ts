import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss']
})
export class PollResultComponent implements OnInit {

  poll$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private pollService: PollService) {
  }

  ngOnInit() {
    this.poll$ = this.route.params.switchMap((params) => {
      return this.pollService.getPoll(params.uuid);
    });
  }

}
