import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatRadioModule, MatProgressSpinnerModule, MatFormFieldModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PollService } from '../poll.service';
import { PollComponent } from './poll.component';

class PollMockService {
    getPoll(uuid: string) {
        return Observable.of('Some Result');
    }
}

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollComponent ],
      imports: [ MatCardModule, MatFormFieldModule, MatRadioModule, MatProgressSpinnerModule, FormsModule, RouterTestingModule ],
      providers: [{provide: PollService, useClass: PollMockService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
