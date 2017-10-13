import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PollService, IPollPayload } from '../poll.service';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPollComponent implements OnInit {

  options: PollOption[] = [];
  
  constructor(private pollService: PollService) {
    this.appendNewOptions(3);
  }

  ngOnInit() {
  }

  onSubmit(pollForm: NgForm) {
    if (pollForm.valid) {
      const options = this.options
        .map((option: PollOption) => option.description)
        .filter((option) => !!option);

      const payload: IPollPayload = {title: pollForm.value.pollTitle, options};

      this.pollService.create(payload).subscribe();
    }
  }

  private appendNewOptions(amount: number) {
    const lastOption = this.options[this.options.length - 1];
    const lastIndex = (lastOption) ? lastOption.id : 0;
    for(let i = lastIndex; i < amount; i++) {
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