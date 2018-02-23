import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PollService, IPollPayload, IPollResponse } from '../poll.service';
import { finalize, share } from 'rxjs/operators';
import { isPresent } from '../../helpers/null-helpers';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPollComponent implements OnInit {
  options: PollOption[] = [];
  pollResult$: Observable<IPollResponse>;
  submitting = false;
  
  constructor(private pollService: PollService) {
    this.appendNewOptions(3);
  }

  ngOnInit() {
  }

  onSubmit(pollForm: NgForm) {
    if (pollForm.valid) {
      this.submitting = true;
      const options = this.options
        .map((option: PollOption) => option.description)
        .filter(isPresent);

      const payload: IPollPayload = {title: pollForm.value.pollTitle, options};

      this.pollResult$ = this.pollService.create(payload)
        .pipe(
          finalize(() => this.submitting = true),
          share()
        );
    }
  }

  onOptionInputFocused(event: FocusEvent, id: number) {
    if (id === this.options.length - 1) {
      const createNewOption = this.options
        .filter(option => option.id !== id)
        .every(option => option.description.length > 0);

      if (createNewOption) {
        this.appendNewOptions(1);
      }
    }
  }

  optionRequired(option: PollOption) {
    if (this.options.every(option => option.description.length === 0)) {
      return option.id === 0;
    }
  }

  private appendNewOptions(amount: number) {
    const lastOption = this.options[this.options.length - 1];
    const startingIndex = (lastOption) ? lastOption.id + 1 : 0;
    for(let i = startingIndex; i < startingIndex + amount; i++) {
      this.options.push(new PollOption({id: i, placeholder: `Option ${i}`, description: ''}))
    }
  }
}

export class PollOption {
  id: number;
  placeholder: string;
  description: string;

  constructor(options: IPollOption) {
    this.id = options.id;
    this.placeholder = options.placeholder;
    this.description = options.description;
  }
}

export interface IPollOption {
  id: number;
  placeholder: string;
  description: string;
}