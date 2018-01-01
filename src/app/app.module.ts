import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule, MatButtonModule, MatInputModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';

import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { NewPollComponent } from './polls/new-poll/new-poll.component';
import { PollService } from './polls/poll.service';
import { PollResultComponent } from './polls/poll-result/poll-result.component';
import { PollComponent } from './polls/poll/poll.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PollShareComponent } from './polls/poll-share/poll-share.component';
import { TransferStateInterceptor } from './http-interceptors/transfer-state.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NewPollComponent,
    PollResultComponent,
    PollComponent,
    BarChartComponent,
    PollShareComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'poller'}),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [PollService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TransferStateInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
