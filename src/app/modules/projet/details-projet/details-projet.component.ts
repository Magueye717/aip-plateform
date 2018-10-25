import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProjet } from '../config/projets.actions';
import { Store } from '@ngrx/store';
import { State } from '../config/projets.reducer';
import { Projet } from '../../../models/projet';
import { getProjet, getIsLoading } from '../../../config/reducers';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  idProjet: number;
  projet = {
    secteur: 'Agriculture et développement rural',
    pays: {
      libelle: 'senegal',
      code: 'sn'
    }
  };

  projetSelected: Projet = {
    idProjet: 0,
    numProjet: '',
    contrePartieEtat: 0,
    dateApprobation: null,
    dateCloturePrev: null,
    dateClotureEff: null,
    budjetProjet: 0,
    nomProjet: '',
    statut: '',
    acteurFinance: '',
    descriptionProjet: '',
    coordonnateurProjet: '',
    categorieEnv: '',
    objectifGeneral: '',
  };

  drapeau: any;
  isImageLoading = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
  ) {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetProjet(+params['id']));
    });

    this.store.select(getProjet).subscribe((projet) => {
      if (projet !== null) {
        this.initialize();
        this.projetSelected = projet;
        console.log(this.projetSelected);
      }
    });
  }

  ngOnInit() {
    this.drapeau = '../../assets/img/flags/' + this.projet.pays.code + '.svg';
  }

  initialize() {
    this.projetSelected = {
      idProjet: 0,
      numProjet: '',
      contrePartieEtat: 0,
      dateApprobation: null,
      dateCloturePrev: null,
      dateClotureEff: null,
      budjetProjet: 0,
      nomProjet: '',
      statut: '',
      acteurFinance: '',
      descriptionProjet: '',
      coordonnateurProjet: '',
      categorieEnv: '',
      objectifGeneral: '',
    };
  }

}
