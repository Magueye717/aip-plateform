/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

declare var $: any;

import { ViewChild } from '@angular/core';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
    MyChart = [];
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    financementsList = [];
    investisseursList = [];
    paysList = [];
    secteursList = [];
    anneesList = [];

    selectedItems = [];
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
        this.financementsList = [
            { item_id: 1, item_text: 'Etat' },
            { item_id: 2, item_text: 'PTF' },
            { item_id: 3, item_text: 'ONG' },
        ];
        this.investisseursList = [
            { item_id: 1, item_text: 'Banque Mondiale' },
            { item_id: 2, item_text: 'ICF' },
            { item_id: 3, item_text: 'USAID' },
        ];
        this.paysList = [
            { item_id: 1, item_text: 'Angola' },
            { item_id: 2, item_text: 'Burkina' },
            { item_id: 3, item_text: 'Mali' },
            { item_id: 4, item_text: 'Senegal' },
        ];
        this.secteursList = [
            { item_id: 1, item_text: 'Agriculture' },
            { item_id: 2, item_text: 'Energie' },
            { item_id: 3, item_text: 'Santé' },
        ];
        this.anneesList = [
            { item_id: 1, item_text: '2016' },
            { item_id: 2, item_text: '2017' },
            { item_id: 3, item_text: '2018' },
        ];

        //  this.objetRecherche.typesfinancement.push(this.financementsList[0]);

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
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



        const myLatlng = new google.maps.LatLng(1.1379666, 11.9660955, true),
            mapOptions = {
                zoom: 3,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        const myLatlng1 = {
            center: new google.maps.LatLng(1.1379666, 11.9660955, true),
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const contentString = 'Times Square, Manhattan';
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 500
        });

        const marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        google.maps.event.addDomListener(window, 'resize', function () {
            const center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });




        this.map = new google.maps.Map(this.gmapElement.nativeElement, myLatlng1);


    }

    rechercher() {
        console.log('Iciiiiiiii: ' + JSON.stringify(this.objetRecherche));
    }

    onItemSelect(item: any) {
        console.log(JSON.stringify(this.objetRecherche.typesfinancement));
    }
    onSelectAll(items: any) {
        console.log(items);
    }

}
