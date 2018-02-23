import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/empty';

import { PollService, IPollResponse } from '../poll.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollComponent implements OnInit {
  choice: any;
  poll$: Observable<IPollResponse>;
  readonly submitStatus$ = new BehaviorSubject<{submitting: boolean, error?: string}>({submitting: false})

  private poll: IPollResponse;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private pollService: PollService) { }

  ngOnInit() {
    this.poll$ = this.route.params.switchMap((params) => {
      return this.pollService.getPoll(params.uuid);
    })
    .do((poll) => this.poll = poll)
    .share();
  }

  onSubmit(pollForm: NgForm) {
    if (pollForm.valid) {
      this.submitStatus$.next({submitting: true});
      this.pollService.vote(this.poll.data.id, this.choice.id)
        .finally(() => {
          this.cd.markForCheck();
        })
        .catch((e: HttpErrorResponse) => {
          this.submitStatus$.next({submitting: false, error: e.error.message});
          return Observable.empty();
        })
        .do(() => this.submitStatus$.next({submitting: false}))
        .subscribe((response) => {
          this.router.navigate([`${this.poll.data.uuid}/results`])
        });
    }
  }
}
