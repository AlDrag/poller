import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPollComponent implements OnInit {

  options: PollOption[] = [];
  
  constructor() {
    this.appendNewOptions(3);
  }

  ngOnInit() {
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