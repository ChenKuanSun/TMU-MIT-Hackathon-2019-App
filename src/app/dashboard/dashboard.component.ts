import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Ard } from '../app-interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dayIndex = 0;
  patientData$: Subject<Ard>;
  showDataChart$: BehaviorSubject<boolean>;
  patientDaliyData$: number[];
  showPredict$: BehaviorSubject<boolean>;
  constructor(
    private appService: AppService
  ) {
    this.patientData$ = this.appService.patientData$;
    this.showDataChart$ = this.appService.showDataChart$;
    this.showPredict$ = this.appService.showPredict$;
  }

  ngOnInit() {}
}
