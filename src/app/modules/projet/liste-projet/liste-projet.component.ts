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
  }

}
