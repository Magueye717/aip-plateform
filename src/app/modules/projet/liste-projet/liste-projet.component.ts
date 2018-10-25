import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, } from 'rxjs';
import { Projet } from '../../../models/projet';
import { Store } from '@ngrx/store';
import { State } from '../config/projets.reducer';
import { getAllProjets } from '../../../config/reducers';
declare var $: any;
import * as L from 'leaflet';

@Component({
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {

  projets: Projet[];

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

  constructor(
    private store: Store<State>
  ) {
    this.store.select(getAllProjets).subscribe((projets) => {
      if (projets !== null) {
        this.projets = projets;
        console.log(this.projets);
      }
    });

  }

  ngOnInit() {
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

}
