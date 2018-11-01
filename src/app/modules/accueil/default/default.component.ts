import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import * as L from 'leaflet';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
    MyChart = [];

    financementsList = [];
    investisseursList = [];
    paysList = [];
    secteursList = [];
    anneesList = [];

    selectedFinancement: number[];
    selectedInvestisseurs: number[];
    selectedPays: number[];
    selectedSecteurs: number[];
    selectedAnnees: number[];

    dropdownSettings = {};

    objetRecherche = {
        typesfinancement: [],
        investisseurs: [],
        pays: [],
        secteurs: [],
        annees: []
    };


    constructor() { }

    ngOnInit() {
        var redIcon = L.icon({
            iconUrl: '../../../../assets/img/redpin.png',
            // shadowUrl: 'leaf-shadow.png',
        
            iconSize:     [25, 25], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [15, 88], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
    
        var blueIcon = L.icon({
            iconUrl: '../../../../assets/img/bluepin.png',
            // shadowUrl: 'leaf-shadow.png',
        
            iconSize:     [25, 25], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [15, 88], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        
        // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
        const myfmap = L.map('fmap').setView([-8.7832, 34.5085], 3.4);
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'F Map'
        }).addTo(myfmap);
        /*var wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
        layers: 'nasa:bluemarble'
    }).addTo(myfmap);*/
    
        const myIcon = L.icon({
            iconUrl: 'http://www.stickpng.com/assets/images/58afdad6829958a978a4a693.png'
          });
          //L.marker([14.6937, -17.44406], {icon: redIcon}).bindPopup('<h4>Bonjour, vous êtes à Dakar</h4>').addTo(myfmap).openPopup();
          L.marker([14.0, -14.0], {icon: blueIcon}).bindPopup('Bonjour').addTo(myfmap).openPopup();
          
         myfmap.on('click', this.onMapClick);

         this.selectedFinancement = [];
         this.selectedAnnees = [];
         this.selectedInvestisseurs = [];
         this.selectedPays = [];
         this.selectedSecteurs = [];

        this.financementsList = [
            { id: 1, name: 'Etat' },
            { id: 2, name: 'PTF' },
            { id: 3, name: 'ONG' },
        ];
        this.investisseursList = [
            { id: 1, name: 'Banque Mondiale' },
            { id: 2, name: 'ICF' },
            { id: 3, name: 'USAID' },
        ];
        this.paysList = [
            { id: 1, name: 'Angola' },
            { id: 2, name: 'Burkina' },
            { id: 3, name: 'Mali' },
            { id: 4, name: 'Senegal' },
        ];
        this.secteursList = [
            { id: 1, name: 'Agriculture' },
            { id: 2, name: 'Energie' },
            { id: 3, name: 'Santé' },
        ];
        this.anneesList = [
            { id: 1, name: '2016' },
            { id: 2, name: '2017' },
            { id: 3, name: '2018' },
        ];

        //  this.objetRecherche.typesfinancement.push(this.financementsList[0]);

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Tout selectionner',
            unSelectAllText: 'Tout deselectionner',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };

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

    rechercher() {
        console.log('Iciiiiiiii: ' + JSON.stringify(this.objetRecherche));
    }
    onMapClick(e) {
        console.log("You clicked the map at " + e.latlng.toString());
    }

}
