import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';

import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollComponent implements OnInit {
  private pollID: number;

  choice: any;
  poll$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private pollService: PollService) { }

  ngOnInit() {
    this.poll$ = this.route.params.switchMap((params) => {
      return this.pollService.getPoll(params.uuid);
    })
    .do((poll) => this.pollID = poll.id)
    .share();
  }

  onSubmit(pollForm: NgForm) {
    if (pollForm.valid) {
      this.pollService.vote(this.pollID, this.choice.id).subscribe((response) => {

      });
    }
  }
}
