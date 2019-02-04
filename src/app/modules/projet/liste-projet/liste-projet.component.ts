declare var require: any;

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, } from 'rxjs';
import { Projet } from '../../../models/projet';
import { ProjetService } from '../../../services/projet.service';
import { SearchProjetDTO } from '../../../dto/SearchProjetDTO';
import { Store } from '@ngrx/store';
import { State } from '../config/projets.reducer';
import { getAllProjets, searchProjets } from '../../../config/reducers';
import { SearchProjet } from '../config/projets.actions';
import { ActeurFinancement } from '../../../models/ActeurFinancement';
import { Pays } from '../../../models/Pays';
import { Secteur } from '../../../models/Secteur';
import { PaysActeur } from '../../../models/PaysActeur';

import { ActeurFinancementService } from '../../../services/acteurfinancement.service';
import { SecteurService } from '../../../services/secteur.service';
import { PaysService } from '../../../services/pays.service';
import { UploadService } from '../../../services/upload.service';

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
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {

  projets: Projet[];
  Highcharts = Highcharts;
  dataMap= [];
  chartMap: any;
  paysSelected: string = "";
  selectedCodePays: string = "";
  typeFinancement: string = "";

  financementsList = [];
  investisseursList = [];
  paysList = [];
  secteursList = [];
  anneesList = [];

  selectedItems = [];
  dropdownSettings = {};
  selectedIdActeur: number;
  selectedIdPaysActeur: number;
  selectedPays: Pays;
  selectedIdPays: number;
  selectedActeur: ActeurFinancement;
  selectedSecteur: Secteur;

  objetRecherche = {
    typesfinancement: [],
    investisseurs: [],
    pays: [],
    secteurs: [],
    annees: []
  };

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private acteurFinancementService: ActeurFinancementService,
    private secteurService: SecteurService,
    private paysService: PaysService,
    private uploadService: UploadService
  ) {
  }

  ngOnInit() {

    this.initMap();

    this.financementsList = [
      { id: 0, name: 'PTF' }
  ];
    
     this.initFiltre();
    
    // list or grid
    (function () {
      /* Variables */
      const icon = $('.grid-list-icon');
      const products = $('.projets');
      $(icon).click(function () {
        if ($(this).hasClass('active')) { return; }
        $(products).toggleClass('list').toggleClass('grid');
        $(icon).toggleClass('active');
      });
    })();


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Tout selectionner',
      unSelectAllText: 'Tout deselectionner',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  initFiltre(){
    this.route.params.subscribe(params => {
      var idActeur = 0;
      var  codePays = "vide";
      var idSecteur = 0;
      if(params['idActeur']){
        idActeur = params['idActeur'];
        this.findActeurById(idActeur);
      }
      if(params['codePays']){
        codePays = params['codePays'];
        this.findPaysByCode(codePays);
      }
      if(params['idSecteur']){
        idSecteur = params['idSecteur'];
      }
      if(params['type']){
        let indice = params['type'];
        this.typeFinancement = this.financementsList[indice].id;
        this.loadActeursByType(this.financementsList[indice].name);
      }
      if(idActeur!=0 || idSecteur!=0 || codePays != "vide"){
        var search: SearchProjetDTO = new SearchProjetDTO();
        search.idActeur = idActeur;
        search.idSecteur = idSecteur;
        search.codePays = codePays;
        console.log("search procjets")
        this.searchProjets(search);
      }
     else{
          console.log("GET ALL !!!!!");
          
          this.loadAllProjets();
         }
        
      });
  }

  searchProjets(dto:SearchProjetDTO){
    this.projetService.searchProjet(dto).subscribe(
        response => {
          console.log('search projets',response);
          this.projets = response;
          
        },
        error => {
          console.log(error);
        }
      );
  }


  loadAllProjets(){
    this.projetService.listAll().subscribe(
        response => {
          console.log('ALL projets',response);
          this.projets = response;
          
        },
        error => {
          console.log(error);
        }
      );
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

findActeurById(idActeur: number){
  this.acteurFinancementService.findByIdActeur(idActeur).subscribe(
    response => {
      console.log('acteur',response);
      if(response){
        this.selectedActeur = response;
        this.selectedIdActeur = this.selectedActeur.idActeur;
      }
      
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
  this.paysList = value.paysActeurs;
  this.loadPaysByIdActeur(this.selectedActeur.idActeur);
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

filtrePays(value: any): void {
  console.log('pays',value);
  this.selectedPays = value;
  console.log('Acteur', this.selectedActeur);
  console.log('Pays', this.selectedPays);
  console.log('selectedPaysActeur',this.selectedIdPaysActeur);
 
  this.loadSecteurByActeurAndPays(this.selectedActeur.idActeur, this.selectedPays.codePays);
}

filtreSecteur(value: any): void {
  console.log('secteur',value);
  this.selectedSecteur = value;
}

rechercher(){
  console.log('acteur', this.selectedActeur);
  console.log('pays', this.selectedPays);
  console.log('secteur', this.selectedSecteur);
  var search: SearchProjetDTO = new SearchProjetDTO();
      if(this.selectedActeur){
        search.idActeur = this.selectedActeur.idActeur;
      }else{
        search.idActeur = 0;
      }
      if(this.selectedSecteur){
        search.idSecteur = this.selectedSecteur.idSecteur;
      }else{
        search.idSecteur = 0;
      }
      if(this.selectedPays){
        search.codePays = this.selectedPays.codePays;
      }else{
        search.codePays = "vide";
      }
      
      this.searchProjets(search);
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
                    click: function(e) {
                      e.point.zoomTo();
                        this.paysSelected = this.name;
                        console.log("this", this);
                        console.log('ttt', tt);
                        tt.paysSelected = this.name;
                        tt.selectedCodePays = this['hc-key'];
                        tt.changePaysFromCarte();
                      
                      }
                  }
              }
          }
      },
    };
}

changePaysFromCarte(){
  console.log('Pays', this.paysSelected, 'code', this.selectedCodePays);
  this.paysService.findByCode(this.selectedCodePays).subscribe(
    response => {
      console.log('pays',response);
      this.selectedPays = response;
      this.paysList = new Array();
      this.paysList=[this.selectedPays];
      this.selectedIdPays = this.selectedPays.idPays;
      console.log('this.payslist', this.paysList);
      this.selectedIdPays = this.selectedPays.idPays;
      console.log('this.selectedPaysActeur', this.selectedIdPaysActeur);
      console.log('this.selectedActeur', this.selectedActeur);
      console.log('this.selectedPays', this.selectedPays);
      var idActeur = 0;
      this.loadSecteurByActeurAndPays(idActeur, this.selectedPays.codePays);
    },
    error => {
      console.log(error);
    }
  );
}

findPaysByCode(codePays){
  this.paysService.findByCode(codePays).subscribe(
    response => {
      console.log('pays',response);
     this.selectedPays = response;
      this.paysList = new Array();
      this.paysList[0]=response;
      console.log('this.payslist', this.paysList);
      this.selectedIdPays = this.selectedPays.idPays;
    },
    error => {
      console.log(error);
    }
  );
}


getImageUrl(url: string){
  if(url){
    return this.uploadService.getLink(url);
  }else{
    return 'assets/img/gal1.jpg';
  }
  
}


}
