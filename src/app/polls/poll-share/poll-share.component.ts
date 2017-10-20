import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-poll-share',
  templateUrl: './poll-share.component.html',
  styleUrls: ['./poll-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollShareComponent implements OnInit {

  @ViewChild('uuid') uuidInput: ElementRef;
  @Input() poll: any;

  hostname: string;

  constructor() {
    this.hostname = window.location.protocol + '//' + window.location.hostname;
  }

  ngOnInit() {
  }

  copyToClipboard() {
    this.uuidInput.nativeElement.select();
    try {
      var successful = document.execCommand('copy');
      if (!successful) throw successful;
    } catch (err) {
      
    }
  }
}
