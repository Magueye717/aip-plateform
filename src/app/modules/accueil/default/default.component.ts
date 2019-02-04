declare var require: any;

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ActeurFinancement } from '../../../models/ActeurFinancement';
import { PaysActeur } from '../../../models/PaysActeur';
import { Pays } from '../../../models/Pays';
import { Secteur } from '../../../models/Secteur';
import { ActeurFavoris } from '../../../dto/ActeurFavoris';
import { SecteurFavoris } from '../../../dto/SecteurFavoris';

import { ActeurFinancementService } from '../../../services/acteurfinancement.service';
import { SecteurService } from '../../../services/secteur.service';
import { PaysService } from '../../../services/pays.service';


import * as Highcharts from 'highcharts/highstock';
import Json from '*.json';
const HC_map = require('highcharts/modules/map');
const HC_exporting = require('highcharts/modules/exporting');

HC_map(Highcharts);
require('../../../config/geojson/africa')(Highcharts);

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
  mapChart: any;
  typeFinancement: string= "";
  mapInstance: any;
  chartMap: any;
  dataMap= [];
  paysSelected: string = "";
  selectedCodePays: string = "";
  financementsList = [];
    investisseursList : ActeurFinancement[];
    selectedActeur: ActeurFinancement;
    paysList : Pays[];
    selectedPays: Pays;
    selectedIdPays: number;
    selectedIdPaysActeur: number;
    secteursList : Secteur[];
    secteursFavorisList : SecteurFavoris[];
    investisseursFavorisList : ActeurFavoris[];
    selectedSecteur: Secteur;
    anneesList = [];
 

  objetRecherche = {
    typesfinancement: [],
    investisseurs: [],
    pays: [],
    secteurs: [],
    annees: []
  };

  constructor(private acteurFinancementService: ActeurFinancementService,
         private secteurService: SecteurService,
         private paysService: PaysService,
         private router: Router) { }

  ngOnInit() {
    this.initListSearching();
    //this.initChart();
    this.initMap();
    this.loadInvestisseursFavoris("vide");
    this.loadSecteurFavoris();
  }

  initMap(){
    var tt= this; 
    tt.dataMap = [
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
       

    this.chartMap = {
        chart: {
          map: 'myMapName',
          instance: {parent:this},
          events: {
            load: function (event) {
              console.log('loaded!!!!!!!', event);
              tt.mapInstance = event.target;
            }
          }
        },
        mapNavigation: {
          enabled: true,
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
              },
              select: {
                color: '#EFFFEF',
                borderColor: 'black',
                dashStyle: 'dot'
            }
            },
            allAreas: false,
            data: tt.dataMap,
            allowPointSelect: true,
            cursor: 'pointer'
          }
        ],
        plotOptions: {
          series: {
              point: {
                  events: {
                      click: function(e) {
                        e.point.zoomTo();
                          this.paysSelected = this.name;
                          console.log("this", this);
                          console.log('ttt', tt);
                          tt.paysSelected = this.name;
                          tt.selectedCodePays = this['hc-key'];
                          tt.changePaysFromCarte();
                        
                        },
                        select: function () {
                          var text = 'Selected ' + this.name + ' (' + this.value + '/km²)',
                              chart = this.series.chart;
                          if (!chart.selectedLabel) {
                              chart.selectedLabel = chart.renderer.label(text, 0, 320)
                                  .add();
                          } else {
                              chart.selectedLabel.attr({
                                  text: text
                              });
                          }
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

  changePaysFromCarte(){
    console.log('Pays', this.paysSelected, 'code', this.selectedCodePays);
    this.paysService.findByCode(this.selectedCodePays).subscribe(
      response => {
        console.log('pays++',response);
        this.selectedPays = response;
        this.paysList = new Array();
        this.paysList=[this.selectedPays];
        this.selectedIdPays = this.selectedPays.idPays;
        console.log('this.payslist', this.paysList);
        console.log('this.selectedPaysActeur', this.selectedIdPaysActeur);
        console.log('this.selectedActeur', this.selectedActeur);
        console.log('this.selectedPays', this.selectedPays);
        var idActeur = 0;
        this.loadSecteurByActeurAndPays(idActeur, this.selectedPays.codePays);
        this.loadInvestisseursFavoris(this.selectedPays.codePays);
      },
      error => {
        console.log(error);
      }
    );
  }


  loadPaysByIdActeur(idActeur){
    this.paysService.findByIdActeur(idActeur).subscribe(
      response => {
        console.log('list pays++',response);
        this.paysList = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  /**
     * list of choice for multiselecting search
     */
    initListSearching() {
      this.financementsList = [
        { id: 0, name: 'PTF' }
    ];
        this.anneesList = [
            { id: 1, name: '2016' },
            { id: 2, name: '2017' },
            { id: 3, name: '2018' },
        ];
    }

  /**
   * Chart initilisation
   */
  initChart(labels: any, data: any) {
    this.MyChart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
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
    var idActeur = 0;
    if(this.selectedActeur){
      idActeur = this.selectedActeur.idActeur;
    }
    var codePays = "";
    if(this.selectedPays){
      codePays = this.selectedPays.codePays;
    }
    var idSecteur = 0;
    if(this.selectedSecteur){
      idSecteur = this.selectedSecteur.idSecteur;
    }
        this.showListeProjets(idActeur, codePays, idSecteur, this.typeFinancement);
    }
    onMapClick(e) {
        console.log('You clicked the map at ' + e.latlng.toString());
    }

    //adg

    showListeProjets(idActeur: number, codePays: string, idSecteur: number, typeFinancement: string) {
        
        this.router.navigate(['projets', { type: typeFinancement, idActeur: idActeur, codePays: codePays, idSecteur: idSecteur }]);
        //alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
      }

    loadActeursByType(type:string){
        this.acteurFinancementService.findByTypeActeur(type).subscribe(
            response => {
              console.log('acteurs',response);
              this.investisseursList = response;
              
            },
            error => {
              console.log(error);
            }
          );
    }

    loadSecteurByActeurAndPays(idActeur: number, codePays: string){
        this.secteurService.findByActeurAndPays(idActeur, codePays).subscribe(
            response => {
              console.log('secteurs',response);
              this.secteursList = response;
              //this.investisseursList = response;
              
            },
            error => {
              console.log(error);
            }
          );
    }

    filtreTypeActeur(value: any): void {
        console.log(value);
        this.selectedIdPaysActeur = 0;
        this.loadActeursByType(value.name);
      }

    filtreInvestisseur(value: any): void {
        console.log('investisseur',value);
        this.selectedActeur = value;
        this.selectedIdPaysActeur = 0;
        //this.paysList = value.paysActeurs;
        this.loadPaysByIdActeur(this.selectedActeur.idActeur);
      }
    
      filtrePays(value: any): void {
        console.log('pays',value);
        this.selectedPays = value;
        console.log('Acteur', this.selectedActeur);
        console.log('Pays', this.selectedPays);
        console.log('selectedPaysActeur',this.selectedIdPaysActeur);
        console.log('map : ',this.mapInstance);
        var point = this.mapInstance.pointer.chart.get('sn');
    
        console.log('point', point);
       
        this.loadSecteurByActeurAndPays(this.selectedActeur.idActeur, this.selectedPays.codePays);
      }

      filtreSecteur(value: any): void {
        console.log('secteur',value);
        this.selectedSecteur = value;
      }


      loadSecteurFavoris(){
        this.secteurService.findSecteursFavoris().subscribe(
            response => {
              console.log('secteurs favoris',response);
              this.secteursFavorisList = response;
              //this.investisseursList = response;
              
            },
            error => {
              console.log(error);
            }
          );
    }


    loadInvestisseursFavoris(codePays: string){
      this.acteurFinancementService.findFavoris(codePays).subscribe(
          response => {
            console.log('investisseurs favoris',response);
            this.investisseursFavorisList = response;
            let lables = [];
            let datas = [];
            for(var value of response){
                console.log('value', value);
                lables.push(value.acteur.nomActeur);
                datas.push(value.montant);
            }
            this.initChart(lables, datas); 
          },
          error => {
            console.log(error);
          }
        );
  }
}
