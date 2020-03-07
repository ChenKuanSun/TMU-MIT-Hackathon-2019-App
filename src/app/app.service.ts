import { Injectable } from '@angular/core';
import { ArdsDataset, Ard } from './app-interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  dataset$ = new Subject<Ard[]>();
  patientIndex$ = new BehaviorSubject<number>(this.getRandom(0, 1000));
  patientData$ = new BehaviorSubject<Ard>(null);
  showPredict$ = new BehaviorSubject<boolean>(false);

  patientDaliyData$ = new BehaviorSubject<number[]>(null);
  dayIndex$ = new BehaviorSubject<number>(0);
  showDataChart$ = new BehaviorSubject<boolean>(false);

  constructor(
    private httpclient: HttpClient
  ) {
    this.httpclient
      .get('assets/data.json')
      .subscribe((data: ArdsDataset) => {
        
        this.dataset$.next(data.ards.filter(ite=> !!ite.value[0][18]));
        this.showDataChart$.next(true);
      });

    combineLatest([this.dataset$, this.patientIndex$]).subscribe(([dataset, patientIndex]) => {
      this.patientData$.next(dataset[patientIndex]);
    });
  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}
