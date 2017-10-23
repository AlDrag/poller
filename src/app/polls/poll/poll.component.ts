import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private poll: any;

  choice: any;
  poll$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
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
      this.pollService.vote(this.poll.id, this.choice.id).subscribe((response) => {
        this.router.navigate([`${this.poll.uuid}/results`])
      });
    }
  }
}
