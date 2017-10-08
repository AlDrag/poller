import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';

import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { NewPollComponent } from './polls/new-poll/new-poll.component';
import { PollService } from './polls/poll.service';

@NgModule({
  declarations: [
    AppComponent,
    NewPollComponent
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
    MatInputModule
  ],
  providers: [PollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
