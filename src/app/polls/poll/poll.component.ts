import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { PollService, IPollResponse } from '../poll.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpErrorResponse } from '@angular/common/http';
import { empty } from 'rxjs/observable/empty';
import { switchMap, share, tap, finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollComponent implements OnInit {
  choice: any;
  poll$: Observable<IPollResponse>;
  readonly submitStatus$ = new BehaviorSubject<{submitting: boolean, error?: string}>({submitting: false});

  private poll: IPollResponse;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private pollService: PollService) {
                this.poll$ = this.route.params
                  .pipe(
                    switchMap((params) => {
                      return this.pollService.getPoll(params.uuid).pipe(share());
                    }),
                    tap(data => console.log('Data: ', data)),
                    tap((poll) => this.poll = poll),
                    share()
                  );
              }

  ngOnInit() {
  }

  onSubmit(pollForm: NgForm) {
    if (pollForm.valid) {
      this.submitStatus$.next({submitting: true});
      this.pollService.vote(this.poll.data.id, this.choice.id)
        .pipe(
          finalize(() => {
            this.cd.markForCheck();
          }),
          catchError((e: HttpErrorResponse) => {
            this.submitStatus$.next({submitting: false, error: e.error.message});
            return empty();
          }),
          tap(() => this.submitStatus$.next({submitting: false}))
        )
        .subscribe((response) => {
          this.router.navigate([`${this.poll.data.uuid}/results`]);
        });
    }
  }
}
