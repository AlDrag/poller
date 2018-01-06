import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NewPollComponent } from './new-poll.component';
import { PollService } from '../poll.service';
import { MatCardModule, MatRadioModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { PollShareComponent } from '../poll-share/poll-share.component';

class PollMockService {
    create(payload: any) {
        
    }
}

describe('NewPollComponent', () => {
  let component: NewPollComponent;
  let fixture: ComponentFixture<NewPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPollComponent, PollShareComponent ],
      imports: [ NoopAnimationsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, FormsModule, RouterTestingModule ],
      providers: [{provide: PollService, useClass: PollMockService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with 3 option fields', () => {
    expect(component.options.length).toEqual(3);
  });

  it('should append 1 new option', () => {
    component.options[0].description = 'Test';
    component.options[1].description = 'Test2';
    expect(component.options.length).toEqual(3);
    fixture.nativeElement.querySelector('#option2').click();
    expect(component.options.length).toEqual(4);
  });
});
