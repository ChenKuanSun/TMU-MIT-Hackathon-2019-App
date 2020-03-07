import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppService } from '../app.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.scss']
})
export class MyLineChartComponent implements OnInit {
  showPredict$: BehaviorSubject<boolean>;
  showPredict = false;
  dataset: any;
  showChart = false;
  lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private appservice: AppService) {
    this.appservice.showPredict$.subscribe((data) => {
      if (data) {
        this.showPredict = true;
        this.lineChartData.push({ data: this.dataset.value.map(ite => ite[7]), label: 'Tidal Ratio', backgroundColor:'rgba(247, 0, 255, 0.8)' })
      } else {
        this.showPredict = false;
        if (this.lineChartData) {

          this.lineChartData.pop();
        }
      }
    });
    this.appservice.patientData$.subscribe((data) => {
      console.log(data);
      this.dataset = data;
      this.lineChartData = [
        // { data: data.value[8], label: '8' },
        { data: data.value.map(ite => ite[16]), label: 'HEARTRATE' },
        { data: data.value.map(ite => ite[8]), label: 'PEEP' },
        { data: data.value.map(ite => ite[9]), label: 'PCO2' },
        { data: data.value.map(ite => ite[10]), label: 'PAO2' },
        { data: data.value.map(ite => ite[11]), label: 'FIO2' },
        { data: data.value.map(ite => ite[12]), label: 'PAO2FIO2' },
        { data: data.value.map(ite => ite[13]), label: 'WBC' },
        { data: data.value.map(ite => ite[14]), label: 'SO2' },
        { data: data.value.map(ite => ite[15]), label: 'PlateauPressure' },
      ];
      this.showChart = true;
    });
  }

  ngOnInit() {
  }

}
