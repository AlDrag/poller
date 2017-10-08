import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule, MatButtonModule, MatInputModule, MatRadioModule } from '@angular/material';

import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { NewPollComponent } from './polls/new-poll/new-poll.component';
import { PollService } from './polls/poll.service';
import { PollResultComponent } from './polls/poll-result/poll-result.component';
import { PollComponent } from './polls/poll/poll.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPollComponent,
    PollResultComponent,
    PollComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
