// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Observable } from 'rxjs/Observable';

// import { PollResultComponent } from './poll-result.component';
// import { BarChartComponent } from '../../charts/bar-chart/bar-chart.component';
// import { PollService } from '../poll.service';

// class PollMockService {
//   getResults() {
//     return Observable.empty;
//   }
// }

// describe('PollResultComponent', () => {
//   let component: PollResultComponent;
//   let fixture: ComponentFixture<PollResultComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ PollResultComponent, BarChartComponent ],
//       imports: [ RouterTestingModule ],
//       providers: [{provide: PollService, useClass: PollMockService}]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PollResultComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
