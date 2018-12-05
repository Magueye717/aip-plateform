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
    private store: Store<State>,
    private route: ActivatedRoute,
    private projetService: ProjetService
  ) {
    /*this.store.select(getAllProjets).subscribe((projets) => {
      if (projets !== null) {
        this.projets = projets;
        console.log(this.projets);
      }
    });*/

  }

  ngOnInit() {

    //////////////
     this.route.params.subscribe(params => {
       if(params['idActeur'] && params['idPays'] && params['idSecteur']){
        console.log("search !!!!!");
          console.log('params', params);
          var idActeur = params['idActeur'];
          var idPays = params['idPays'];
          var idSecteur = params['idSecteur'];
          console.log('idActeur',idActeur,'idPays',idPays,'idSecteur',idSecteur);
          var search: SearchProjetDTO = new SearchProjetDTO();
          search.idActeur = parseInt(idActeur);
          search.idSecteur = parseInt(idSecteur);
          search.idPays = parseInt(idPays);
          this.searchProjets(search);
          /*
            this.store.dispatch(new SearchProjet(search));
            this.store.select(searchProjets).subscribe((projets) => {
              if (projets !== null) {
                this.projets = projets;
                console.log(this.projets);
              }
            });
          */
       }
       else{
        console.log("GET ALL !!!!!");
        /*this.store.select(getAllProjets).subscribe((projets) => {
          if (projets !== null) {
            this.projets = projets;
            console.log(this.projets);
          }
        });
        */
        this.loadAllProjets();
       }
      
    });
    
    /////////////
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


  searchProjets(dto:SearchProjetDTO){
    this.projetService.searchProjet(dto).subscribe(
        response => {
          console.log('acteurs',response);
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
          console.log('acteurs',response);
          this.projets = response;
          
        },
        error => {
          console.log(error);
        }
      );
  }

}
