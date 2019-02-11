declare var require: any;

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ActeurFinancement } from '../../models/ActeurFinancement';
import { PaysActeur } from '../../models/PaysActeur';
import { Pays } from '../../models/Pays';
import { Secteur } from '../../models/Secteur';
import { ActeurFavoris } from '../../dto/ActeurFavoris';
import { SecteurFavoris } from '../../dto/SecteurFavoris';

import { ActeurFinancementService } from '../../services/acteurfinancement.service';
import { SecteurService } from '../../services/secteur.service';
import { PaysService } from '../../services/pays.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  MyChart = [];

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
  latitude: number =  17.8124677;
  longitude: number = 13.2379066;
  zoomLevel = 4;
 

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
  
    this.loadInvestisseursFavoris("vide");
    this.loadSecteurFavoris();
    this.loadPaysProjet();
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

  loadPaysProjet(){
    this.paysService.findPaysProjet().subscribe(
      response => {
        console.log('list pays projet++',response);
        this.paysList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  clickedMarker(pays: Pays) {
    console.log('clicked the marker:', pays);
    //this.zoomLevel=5;
    this.selectedCodePays= pays.codePays;
    this.latitude = pays.lat;
    this.longitude = pays.lon;
    
    this.changePaysFromCarte();
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
