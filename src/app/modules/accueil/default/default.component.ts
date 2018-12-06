declare var require: any;

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import * as Highcharts from 'highcharts/highstock';
const HC_map = require('highcharts/modules/map');
const HC_exporting = require('highcharts/modules/exporting');

HC_map(Highcharts);
require('./geojson/africa')(Highcharts);

HC_exporting(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'orange'
    }
  }
});

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  MyChart = [];
  Highcharts = Highcharts;
  chartMap: any;
  dataMap= [];
  paysSelected: string = "";
  

  /*  */
  

  /*  */

  financementsList = [];
  investisseursList = [];
  paysList = [];
  secteursList = [];
  anneesList = [];

  objetRecherche = {
    typesfinancement: [],
    investisseurs: [],
    pays: [],
    secteurs: [],
    annees: []
  };

  constructor() {}

  ngOnInit() {
    this.initListSearching();
    this.initChart();
    this.initMap();
  }

  initMap(){
    this.dataMap = [
        ['ug', 0],
        ['ng', 0],
        ['st', 0],
        ['tz', 0],
        ['sl', 0],
        ['gw', 0],
        ['cv', 0],
        ['sc', 0],
        ['tn', 0],
        ['mg', 0],
        ['ke', 0],
        ['cd', 0],
        ['fr', 0],
        ['mr', 0],
        ['dz', 0],
        ['er', 0],
        ['gq', 0],
        ['mu', 0],
        ['sn', 0],
        ['km', 0],
        ['et', 0],
        ['ci', 0],
        ['gh', 0],
        ['zm', 0],
        ['na', 0],
        ['rw', 0],
        ['sx', 0],
        ['so', 0],
        ['cm', 0],
        ['cg', 0],
        ['eh', 0],
        ['bj', 0],
        ['bf', 0],
        ['tg', 0],
        ['ne', 0],
        ['ly', 0],
        ['lr', 0],
        ['mw', 0],
        ['gm', 0],
        ['td', 0],
        ['ga', 0],
        ['dj', 0],
        ['bi', 0],
        ['ao', 0],
        ['gn', 0],
        ['zw', 0],
        ['za', 0],
        ['mz', 0],
        ['sz', 0],
        ['ml', 0],
        ['bw', 0],
        ['sd', 0],
        ['ma', 0],
        ['eg', 0],
        ['ls', 0],
        ['ss', 0],
        ['cf', 0]
      ];
      this.paysSelected;
       var tt= this;

    this.chartMap = {
        chart: {
          map: 'myMapName',
          instance: {parent:this}
        },
        mapNavigation: {
          enabled: false,
          buttonOptions: {
            alignTo: 'spacingBox'
          }
        },
        colorAxis: {
          min: 0
        },
        series: [
          {
            name: 'Random data',
            states: {
              hover: {
                color: '#BADA55'
              }
            },
            allAreas: false,
            data: this.dataMap
          }
        ],
        plotOptions: {
          series: {
              point: {
                  events: {
                      click: function() {
                          this.paysSelected = this.name;
                          console.log("this", this);
                          console.log('ttt', tt);
                          tt.consoleFunction();
                          alert(this.paysSelected);
                        }
                    }
                }
            }
        },
      };
  }

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }

  consoleFunction() {
    console.log('Hello');
  }


  initListSearching() {
    this.financementsList = [
      { id: 1, name: 'Etat' },
      { id: 2, name: 'PTF' },
      { id: 3, name: 'ONG' }
    ];
    this.investisseursList = [
      { id: 1, name: 'Banque Mondiale' },
      { id: 2, name: 'ICF' },
      { id: 3, name: 'USAID' }
    ];
    this.paysList = [
      { id: 1, name: 'Angola' },
      { id: 2, name: 'Burkina' },
      { id: 3, name: 'Mali' },
      { id: 4, name: 'Senegal' }
    ];
    this.secteursList = [
      { id: 1, name: 'Agriculture' },
      { id: 2, name: 'Energie' },
      { id: 3, name: 'Santé' }
    ];
    this.anneesList = [
      { id: 1, name: '2016' },
      { id: 2, name: '2017' },
      { id: 3, name: '2018' }
    ];
  }

  /**
   * Chart initilisation
   */
  initChart() {
    this.MyChart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Banque mondiale', 'ICF', 'USAID', 'Nations Unies', 'BAD'],
        datasets: [
          {
            data: [250, 50, 100, 120, 90],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#44c7a2',
              '#cc65fe'
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    });
  }

  rechercher() {
    console.log('Iciiiiiiii: ' + JSON.stringify(this.objetRecherche));
  }
  onMapClick(e) {
    console.log('You clicked the map at ' + e.latlng.toString());
  }
}
