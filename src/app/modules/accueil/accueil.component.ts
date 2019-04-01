declare var require: any;

declare var google: any;

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ActeurFinancement } from '../../models/ActeurFinancement';
import { PaysActeur } from '../../models/PaysActeur';
import { Pays } from '../../models/Pays';
import { Projet } from '../../models/projet';
import { Secteur } from '../../models/Secteur';
import { ActeurFavoris } from '../../dto/ActeurFavoris';
import { SecteurFavoris } from '../../dto/SecteurFavoris';

import { ActeurFinancementService } from '../../services/acteurfinancement.service';
import { SecteurService } from '../../services/secteur.service';
import { PaysService } from '../../services/pays.service';
import { ProjetService } from '../../services/projet.service';

import myGeoJSON from '../../config/geojson/africa.geo.json';

import * as L from 'leaflet';
import { inspect } from 'util';
import { concat } from 'rxjs/internal/operators/concat';
import { Map } from 'mapbox-gl';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  MyChart = [];
  latlngBounds: any;

  mapChart: any;
  typeFinancement: string= "";
  chartMap: any;
  dataMap= [];
  paysSelected: string = "";
  selectedCodePays: string = "";
  financementsList = [];
  investisseursList : ActeurFinancement[];
  selectedActeur: ActeurFinancement;
  paysList : Pays[];
  projetList : Projet[];
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
  zoomLevel = 5;
  GEOJSON: any;
  myfrugalmap: any;
  selectedElement: any;
  isSelection: boolean = false;
  selectedMarker: any;
  geoJSONSelected: any;
  mapFeatures: any;

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
         private projetService: ProjetService,
         private router: Router) { }

  ngOnInit() {
    this.initListSearching();
    //this.initChart();
    this.loadAllSecteurs();
    this.loadAllInvestisseurs();
    this.loadInvestisseursFavoris("vide");
    this.loadSecteurFavoris();
    this.loadPaysProjet();
    this.initLeafLet();
    console.log('myGeoJSON',myGeoJSON);
    
 
  }

  initLeafLet(){
    
  var instance = this;
  this.myfrugalmap = L.map('map_container').setView([5.9248723, 7.9259507], 4);

   
 
  //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(this.myfrugalmap);

    var info = L.Control;
    ////////
   this.mapFeatures = {};
    this.GEOJSON = L.geoJSON(myGeoJSON, {
      style: function(feature){
        var fillColor,
            density = feature.properties.density;
        if ( density > 80 ) fillColor = "#006837";
        else if ( density > 40 ) fillColor = "#31a354";
        else if ( density > 20 ) fillColor = "#78c679";
        else if ( density > 10 ) fillColor = "#c2e699";
        else if ( density > 0 ) fillColor = "#ffffcc";
        else fillColor = "#f7f7f7";  // no data
        return { color: "#999", weight: 2, fillColor: fillColor, fillOpacity: .6, dashArray: '3' };
      },
      onEachFeature: function( feature, layer){
        console.log('feat', feature, 'layer', layer);
        instance.mapFeatures[feature.properties['iso_a2']]= {layer: layer, feature: feature};
        //layer.bindPopup( "<strong>" + feature.properties['brk_name'] + "</strong><br/>" + feature.properties.density + " rats per square mile" );        
          layer.on('mouseover', (e) => instance.highlightFeature(e));
          layer.on('mouseout', (e) => instance.clearHighLight(e));
          layer.on('mousedown', (e) => instance.clickOnMap(e.target));
      }
    }).addTo(this.myfrugalmap);

    console.log('geoJSON', this.GEOJSON);

    this.myfrugalmap.fitBounds(this.GEOJSON.getBounds());
  }

  
fitBoundsSelectedCountry(codeIso2Pays:string){
  console.log('zgrgetagttt');
  this.geoJSONSelected= {};
  var features = [];
/*good
myGeoJSON.features.forEach(element => {
  if(element.properties['iso_a2'] === codeIso2Pays){
    console.log('elem',element, element.properties['iso_a2']);
    features.push(element);
    this.geoJSONSelected.type='FeatureCollection';
    this.geoJSONSelected.features = features;
    this.geoJSONSelected.options = {
      color: "red"
    }
    let tempGeJSON  = L.geoJSON(this.geoJSONSelected).addTo(this.myfrugalmap);;
    
  this.myfrugalmap.fitBounds(tempGeJSON.getBounds());
  }
  
});
*/

//console.log('***',this.GEOJSON['_layers']);
/*if(this.selectedElement){
  this.selectedElement.layer.setStyle({
    weight: 5,
    color: 'red',
    fillColor: '#006837',
    dashArray: '',
    fillOpacity: 0.7
}); 
}*/
this.selectedElement = this.mapFeatures[codeIso2Pays];
console.log('selectedFeature++++ ',this.selectedElement);
this.clickOnMap(this.selectedElement.layer);
//selectedElement.layer.options.color ="red";
//this.selectedElement.layer.setStyle({fillColor :'red'}) 
//this.myfrugalmap.fitBounds(this.selectedElement.layer.getBounds());

}

  highlightFeature(e) {
    
    if(!this.isSelection){
      var layer = e.target;
      layer.setStyle({
        weight: 5,
        color: '#666',
        fillColor: '#006837',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.edge) {
        layer.bringToFront();
    }
    }
    
}

clearHighLight(e){
  if(!this.isSelection){
    this.GEOJSON.resetStyle(e.target);
  }
}

clickOnMap(e){
  console.log("eeeeeeeeeeeeeee",e);
  this.myfrugalmap.fitBounds(e.getBounds());
  this.isSelection = true;
  if(this.selectedMarker){
    this.GEOJSON.resetStyle(this.selectedMarker);
  }
  this.selectedMarker = e;

    e.setStyle({
        weight: 5,
        color: 'red',
        fillColor: '#006837',
        dashArray: '',
        fillOpacity: 0.7
    });

  this.selectedCodePays = e.feature.properties.postal;
  console.log('codePostal', this.selectedCodePays);
  this.changePaysFromCarte();
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
        //this.paysList = new Array();
        //this.paysList=[this.selectedPays];
        this.selectedIdPays = this.selectedPays.idPays;
        console.log('this.payslist', this.paysList);
        console.log('this.selectedPaysActeur', this.selectedIdPaysActeur);
        console.log('this.selectedActeur', this.selectedActeur);
        console.log('this.selectedPays', this.selectedPays);
        var idActeur = '0';
        this.loadSecteurByActeurPays(idActeur, this.selectedPays.codePays);
        this.loadInvestisseursFavoris(this.selectedPays.codePays);
        this.loadActeursByCodePays(this.selectedPays.codePays);
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


  loadPaysBySecteur(idSecteur: number){
    this.paysService.findBySecteur(idSecteur).subscribe(
      response => {
        console.log('list pays projet++',response);
        this.paysList = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  findProjetByCodePays(codePays: string){
    this.projetService.findProjetByCodePays(codePays).subscribe(
      response => {
        console.log('list projet++',response);
        this.projetList = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  clickedMarker(pays: Pays) {
    console.log('clicked the marker:', pays);
    //this.zoomLevel=2;
    this.selectedCodePays= pays.codePays;
    //this.latlngBounds = new window['google'].maps.LatLngBounds();
    //this.latlngBounds.extend(new window['google'].maps.LatLng(pays.lat, pays.lon));
    //this.latitude = pays.lat;
    //this.longitude = pays.lon;
    this.changePaysFromCarte();
    this.findProjetByCodePays(pays.codePays);
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

    loadActeursByCodePays(codePays:string){
      this.acteurFinancementService.findByPays(codePays).subscribe(
          response => {
            console.log('acteurs',response);
            this.investisseursList = response;
            
          },
          error => {
            console.log(error);
          }
        );
  }

  loadActeursBySecteur(idSecteur:number){
    this.acteurFinancementService.findBySecteur(idSecteur).subscribe(
        response => {
          console.log('acteurs',response);
          this.investisseursList = response;
          
        },
        error => {
          console.log(error);
        }
      );
}

    loadSecteurByActeurPays(idActeur: string, codePays: string){
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
        
        console.log('pays+++',value);
        this.selectedPays = value;
        this.isSelection = true;
        this.fitBoundsSelectedCountry(this.selectedPays.codePays);
        console.log('Acteur', this.selectedActeur);
        console.log('Pays', this.selectedPays);
        console.log('selectedPaysActeur',this.selectedIdPaysActeur);
        //console.log('map : ',this.mapInstance);
        //var point = this.mapInstance.pointer.chart.get('sn');
    
        //console.log('point', point);
       var idActeur='0';
       if(this.selectedActeur){
        idActeur = ''+this.selectedActeur.idActeur;
       }
        this.loadSecteurByActeurPays(idActeur, this.selectedPays.codePays);
        this.loadActeursByCodePays(this.selectedPays.codePays);
        
      }

      filtreSecteur(value: any): void {
        console.log('secteur',value);
        this.selectedSecteur = value;
        this.loadActeursBySecteur(this.selectedSecteur.idSecteur);
        this.loadPaysBySecteur(this.selectedSecteur.idSecteur);
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

    loadAllSecteurs(){
      this.secteurService.listAll().subscribe(
          response => {
            console.log('All Secteurs ',response);
            this.secteursList = response;
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


  loadAllInvestisseurs(){
    this.acteurFinancementService.listAll().subscribe(
        response => {
          console.log('All investisseurs',response);
          this.investisseursList = response;
        },
        error => {
          console.log(error);
        }
      );
}

  showDetailsProjet(projet: Projet){
    this.router.navigate(['projets/'+projet.idProjet]);
  }
}
