import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PollService } from '../poll.service';
import { switchMap, share, map } from 'rxjs/operators';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollResultComponent implements OnInit {

  result$: Observable<{count: number, description: string, id: string, poll_id: string}[]>;
  graphData$: Observable<GraphData>;

  constructor(private route: ActivatedRoute,
              private pollService: PollService) {
  }

  ngOnInit() {
    this.result$ = this.route.params
      .pipe(
        switchMap((params) => {
          return this.pollService.getResults(params.uuid)
            .pipe(map((response: any) => response.data));
        }),
        share()
      );

    this.graphData$ = this.result$
      .pipe(
        map((results: any[]) => {
          const object: GraphData = {labels: [], values: []};
          for (let i = 0; i < results.length; i++) {
            object.labels.push(results[i].description);
            object.values.push(parseInt(results[i].count));
          }
          return object;
        })
      );
  }
}

export interface GraphData {
  labels: string[],
  values: number[]
}
