import { Routes } from '@angular/router';
import { NewPollComponent } from './polls/new-poll/new-poll.component';

export const appRoutes: Routes = [
    {
      path: 'new',
      component: NewPollComponent,
    },
    { path: '',
      redirectTo: '/new',
      pathMatch: 'full'
    }
  ];
  