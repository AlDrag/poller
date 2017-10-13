import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';

import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss']
})
export class PollResultComponent implements OnInit {

  result$: Observable<{count: number, description: string, id: string, poll_id: string}[]>;
  graphData$: Observable<{labels: string[], values: number[]}>;

  constructor(private route: ActivatedRoute,
              private pollService: PollService) {
  }

  ngOnInit() {
    this.result$ = this.route.params.switchMap((params) => {
      return this.pollService.getResults(params.uuid).map((response: any) => response.data);
    }).share();

    this.graphData$ = this.result$.map((results: any[]) => {
      const object = {labels: [], values: []};
      for(let i = 0; i < results.length; i++) {
        object.labels.push(results[i].description);
        object.values.push(parseInt(results[i].count));
      }
      return object;
    });
  }

}
