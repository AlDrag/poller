import { Routes } from '@angular/router';
import { NewPollComponent } from './polls/new-poll/new-poll.component';
import { PollResultComponent } from './polls/poll-result/poll-result.component';
import { PollComponent } from './polls/poll/poll.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: NewPollComponent,
      pathMatch: 'full'
    },
    {
      path: ':uuid',
      component: PollComponent,
      pathMatch: 'full'
    },
    {
      path: ':uuid/results',
      component: PollResultComponent,
      pathMatch: 'full'
    }
  ];
