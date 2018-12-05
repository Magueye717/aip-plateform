import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

import { ActeurFinancement } from '../../../models/ActeurFinancement';
import { PaysActeur } from '../../../models/PaysActeur';
import { Pays } from '../../../models/Pays';
import { Secteur } from '../../../models/Secteur';
import { ActeurFinancementService } from '../../../services/acteurfinancement.service';
import { SecteurService } from '../../../services/secteur.service';

import africa from './africa.geo.json';
import * as L from 'leaflet';
import * as LM from 'leaflet.markercluster';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
    MyChart = [];
    africa = africa;

    financementsList = [];
    investisseursList : ActeurFinancement[];
    selectedActeur: ActeurFinancement;
    paysList : PaysActeur[];
    selectedPays: Pays;
    secteursList : Secteur[];
    selectedSecteur: Secteur;
    anneesList = [];



    objetRecherche = {
        typesfinancement: [],
        investisseurs: [],
        pays: [],
        secteurs: [],
        annees: []
    };

    featureLayer = new L.GeoJSON();
    defaultStyle = {
        color: '#2262CC',
        weight: 2,
        opacity: 0.6,
        fillOpacity: 0.1,
        fillColor: '#2262CC'
    };
    highlightStyle = {
        color: '#2262CC',
        weight: 3,
        opacity: 0.6,
        fillOpacity: 0.65,
        fillColor: '#2262CC'
    };



    constructor(private acteurFinancementService: ActeurFinancementService,
         private secteurService: SecteurService,
         private router: Router) { }

    ngOnInit() {
        this.initMap();
        this.initListSearching();
        this.initChart();
    }

    /**
     * Init Map
     */
    initMap() {
        const map = L.map('map', {
            scrollWheelZoom: false,
            touchZoom: false,
            doubleClickZoom: false,
        }).setView([2.0000003, 15.9999997], 3.5);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicGFwYW91c21hbmUiLCJhIjoiY2pvMDN5MHlsMDYwdjNwcGJlYmJxajI5OCJ9.OmLCeU1G-rS8UB_YTRI59w'
        }).addTo(map);
        const geojsonMarkerOptions = {
            radius: 8,
            fillColor: '#ff7800',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        L.geoJSON(africa).addTo(map);
        this.featureLayer = L.geoJSON(africa, {
            onEachFeature: this.onEachFeature
        });
        map.addLayer(this.featureLayer);

    }

    /**
     * list of choice for multiselecting search
     */
    initListSearching() {
        this.financementsList = [
            { id: 1, name: 'ETAT' },
            { id: 2, name: 'PTF' },
            { id: 3, name: 'ONG' },
        ];
        /*this.investisseursList = [
            { id: 1, name: 'Banque Mondiale' },
            { id: 2, name: 'ICF' },
            { id: 3, name: 'USAID' },
        ];*/
        /*this.paysList = [
            { id: 1, name: 'Angola' },
            { id: 2, name: 'Burkina' },
            { id: 3, name: 'Mali' },
            { id: 4, name: 'Senegal' },
        ];
        */
        /*
        this.secteursList = [
            { id: 1, name: 'Agriculture' },
            { id: 2, name: 'Energie' },
            { id: 3, name: 'Santé' },
        ]; */
        this.anneesList = [
            { id: 1, name: '2016' },
            { id: 2, name: '2017' },
            { id: 3, name: '2018' },
        ];
    }

    /**
     * Chart initilisation
     */
    initChart() {
        this.MyChart = new Chart('myChart', {
            type: 'pie',
            data: {
                labels: [
                    'Banque mondiale',
                    'ICF',
                    'USAID',
                    'Nations Unies',
                    'BAD'
                ],
                datasets: [{
                    data: [250, 50, 100, 120, 90],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#44c7a2',
                        '#cc65fe'
                    ]
                }]
            },
            options: {
                legend: {
                    display: true,
                    position: 'right'
                }
            }
        });
    }

    /**
     * features.length
     */
    onEachFeature(feature, layer) {
        layer.setStyle(this.defaultStyle);
        (function (layer, properties) {
            layer.on('mouseover', function (e) {
                layer.setStyle(this.highlightStyle);
                const popup = $('<div></div>', {
                    id: 'popup-' + properties.cartodb_id,
                    css: {
                        position: 'absolute',
                        bottom: '85px',
                        left: '50px',
                        zIndex: 1002,
                        backgroundColor: 'white',
                        padding: '8px',
                        border: '1px solid #ccc'
                    }
                });
                const hed = $('<div></div>', {
                    text: properties.name,
                    css: { fontSize: '16px', marginBottom: '3px' }
                }).appendTo(popup);
                popup.appendTo('#map');
            });
            layer.on('mouseout', function (e) {
                layer.setStyle(this.defaultStyle);
                $('#popup-' + properties.cartodb_id).remove();
            });

            layer.on('click', function (e) {
                this.paysSelected = properties.name;
                console.log(this.paysSelected);
            });
        })(layer, feature.properties);
    }

    rechercher() {
        this.showListeProjets(this.selectedActeur.idActeur, this.selectedPays.idPays, this.selectedSecteur.idSecteur);
    }
    onMapClick(e) {
        console.log('You clicked the map at ' + e.latlng.toString());
    }

    //adg

    showListeProjets(idActeur: number, idPays: number, idSecteur: number) {
        
        this.router.navigate(['projets', { idActeur: idActeur, idPays: idPays, idSecteur: idSecteur }]);
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

    loadSecteurByActeurAndPays(idActeur: number, idPays: number){
        this.secteurService.findByActeurAndPays(idActeur, idPays).subscribe(
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
        this.loadActeursByType(value.name);
      }

    filtreInvestisseur(value: any): void {
        console.log('investisseur',value);
        this.selectedActeur = value;
        this.paysList = value.paysActeurs;
      }
    
      filtrePays(value: any): void {
        console.log('pays',value);
        this.selectedPays = value.pays;
        console.log('Acteur', this.selectedActeur);
        console.log('Pays', this.selectedPays);
        this.loadSecteurByActeurAndPays(this.selectedActeur.idActeur, this.selectedPays.idPays);
      }

      filtreSecteur(value: any): void {
        console.log('secteur',value);
        this.selectedSecteur = value;
      }


}
