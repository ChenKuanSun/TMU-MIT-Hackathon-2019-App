import { Component } from '@angular/core';
import { AppService } from './app.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Ard } from './app-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'team6app';
  patientData$: Subject<Ard>;
  durationInSeconds = 5;
  showPredict$: BehaviorSubject<boolean>;

  constructor(
    private appService: AppService,
  ) {
    this.patientData$ = this.appService.patientData$;
    this.showPredict$ = this.appService.showPredict$;
  }
  predict() {
    this.showPredict$.next(!this.showPredict$.value);
  }
}
