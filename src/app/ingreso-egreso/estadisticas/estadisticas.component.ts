import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [],
})
export class EstadisticasComponent implements OnInit, OnDestroy {
  totalIngreso: number = 0;
  totalIngresoItems: number = 0;
  totalEgreso: number = 0;
  totalEgresoItems: number = 0;

  estadisticaSub: Subscription;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Ingreso', 'Egreso'],
    datasets: [],
  };
  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [DatalabelsPlugin];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.estadisticaSub = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.estadisticaSub.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.totalIngreso = 0;
    this.totalIngresoItems = 0;
    this.totalEgreso = 0;
    this.totalEgresoItems = 0;
    items.forEach((item) => {
      if (item.tipo === 'ingreso') {
        this.totalIngreso += item.monto;
        this.totalIngresoItems++;
      } else {
        this.totalEgreso += item.monto;
        this.totalEgresoItems++;
      }
    });

    this.pieChartData.datasets = [
      {
        data: [this.totalIngreso, this.totalEgreso],
      },
    ];
  }
}
