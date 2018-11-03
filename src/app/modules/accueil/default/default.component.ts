import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import africa from './custom.geo.json';
import { tileLayer, latLng, Marker, marker, icon } from 'leaflet';


@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
    MyChart = [];
    africa = africa;

    financementsList = [];
    investisseursList = [];
    paysList = [];
    secteursList = [];
    anneesList = [];
    paysSelected = 'Sénégal';

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

    statesData;
    /*  featureLayer = new L.GeoJSON();
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
     }; */



    constructor() { }

    ngOnInit() {
        console.log(this.paysSelected);
        // initialize the map on the "map" div with a given center and zoom
        /*  const map = L.map('map', { scrollWheelZoom: false }).setView([-8.783195, 34.50852299999997], 3);
         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
                 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
                 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             maxZoom: 18,
             id: 'mapbox.streets',
             accessToken: 'pk.eyJ1IjoicGFwYW91c21hbmUiLCJhIjoiY2pvMDN5MHlsMDYwdjNwcGJlYmJxajI5OCJ9.OmLCeU1G-rS8UB_YTRI59w'
         }).addTo(map); */
        /* const geojsonMarkerOptions = {
            radius: 8,
            fillColor: '#ff7800',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        L.geoJSON(africa).addTo(map); */
        /*  this.featureLayer = L.geoJSON(africa, {
             // And link up the function to run when loading each feature
             onEachFeature: this.onEachFeature
         });
         // Finally, add the layer to the map.
         map.addLayer(this.featureLayer); */


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


   /*  onEachFeature(feature, layer) {
        // Load the default style.
        layer.setStyle(this.defaultStyle);
        // Create a self-invoking function that passes in the layer
        // and the properties associated with this particular record.
        (function (layer, properties) {
            // Create a mouseover event
            layer.on('mouseover', function (e) {
                // Change the style to the highlighted version
                layer.setStyle(this.highlightStyle);
                // Create a popup with a unique ID linked to this record
                const popup = $('<div></div>', {
                    id: 'popup-' + properties.party,
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
                // Insert a headline into that popup
                const hed = $('<div></div>', {
                    text: properties.name,
                    css: { fontSize: '16px', marginBottom: '3px' }
                }).appendTo(popup);
                // Add the popup to the map
                popup.appendTo('#map');
            });
            // Create a mouseout event that undoes the mouseover changes
            layer.on('mouseout', function (e) {
                // Start by reverting the style back
                layer.setStyle(this.defaultStyle);
                // And then destroying the popup
                $('#popup-' + properties.party).remove();
            });

            layer.on('click', function (e) {
                this.paysSelected = properties.name;
                console.log(this.paysSelected);
            });
            // Close the "anonymous" wrapper function, and call it while passing
            // in the variables necessary to make the events work the way we want.
        })(layer, feature.properties);
    } */

    rechercher() {
        console.log('Iciiiiiiii: ' + JSON.stringify(this.objetRecherche));
    }
    onMapClick(e) {
        console.log('You clicked the map at ' + e.latlng.toString());
    }

}
