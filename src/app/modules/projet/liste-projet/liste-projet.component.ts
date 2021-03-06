declare var require: any;

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
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

import myGeoJSON from '../../../config/geojson/africa.geo.json';

import * as L from 'leaflet';
import { concat } from 'rxjs/internal/observable/concat';



@Component({
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {

  projets: Projet[];
  totalProjet: number;

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
  GEOJSON: any;
  myfrugalmap: any;
  geoJSONSelected: any;
  mapFeatures: any;
  isSelection: boolean = false;
  selectedMarker: any;
  selectedElement: any;

  objetRecherche = {
    typesfinancement: [],
    investisseurs: [],
    pays: [],
    secteurs: [],
    annees: []
  };

  latitude: number =  17.8124677;
  longitude: number = 13.2379066;
  zoomLevel = 4;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private acteurFinancementService: ActeurFinancementService,
    private secteurService: SecteurService,
    private paysService: PaysService,
    private uploadService: UploadService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.financementsList = [
      { id: 0, name: 'PTF' }
  ];
    
     
     this.initLeafLet();
     this.loadAllSecteurs();
     this.loadAllInvestisseurs();
     this.loadPaysProjet();
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
          //console.log('feat', feature, 'layer', layer);
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
        this.fitBoundsSelectedCountry(codePays);
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
          this.loadPaysProjet();
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
    this.projetService.listPublicProjet().subscribe(
        response => {
          console.log('ALL projets',response);
          this.projets = response;
          this.totalProjet = this.projets.length;
          console.log('totalProjet', this.totalProjet);
          
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

  loadSecteurByActeurAndPays(idActeur: string, codePays: string){
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
        
  console.log('pays+++',value);
  this.selectedPays = value;
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



changePaysFromCarte(){
  console.log('Pays', this.paysSelected, 'code', this.selectedCodePays);
  this.paysService.findByCode(this.selectedCodePays).subscribe(
    response => {
      console.log('pays',response);
      this.selectedPays = response;
      //this.paysList = new Array();
      //this.paysList=[this.selectedPays];
      this.selectedIdPays = this.selectedPays.idPays;
      console.log('this.payslist', this.paysList);
      this.selectedIdPays = this.selectedPays.idPays;
      console.log('this.selectedPaysActeur', this.selectedIdPaysActeur);
      console.log('this.selectedActeur', this.selectedActeur);
      console.log('this.selectedPays', this.selectedPays);
      var idActeur = '0';
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
      this.latitude = this.selectedPays.lat;
      this.longitude = this.selectedPays.lon;
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
findProjetByCodePays(codePays: string){
  this.projetService.findProjetByCodePays(codePays).subscribe(
    response => {
      console.log('list projet++',response);
      this.projets = response;
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
  //this.latitude = pays.lat;
  //this.longitude = pays.lon;
  this.changePaysFromCarte();
  this.findProjetByCodePays(pays.codePays);
}

showDetailsProjet(projet: Projet){
  this.router.navigate(['projets/'+projet.idProjet]);
}

fitBoundsSelectedCountry(codeIso2Pays:string){
  console.log('zgrgetagttt');
  this.geoJSONSelected= {};
  var features = [];
  this.selectedElement = this.mapFeatures[codeIso2Pays];
console.log('selectedFeature++++ ',this.selectedElement);
this.clickOnMap(this.selectedElement.layer);
/*
if(this.selectedElement){
  this.selectedElement.layer.setStyle({
    weight: 5,
    color: 'red',
    fillColor: '#006837',
    dashArray: '',
    fillOpacity: 0.7
}); 
}
this.selectedElement = this.mapFeatures[codeIso2Pays];
console.log('selectedFeature++++ ',this.selectedElement);
//selectedElement.layer.options.color ="red";
this.selectedElement.layer.setStyle({fillColor :'red'}) 
this.myfrugalmap.fitBounds(this.selectedElement.layer.getBounds());
*/
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


}
