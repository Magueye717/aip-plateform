import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProjet } from '../config/projets.actions';
import { Store } from '@ngrx/store';
import { State } from '../config/projets.reducer';
import { Projet } from '../../../models/projet';
import { getProjet, getIsLoading } from '../../../config/reducers';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from '../../../services/upload.service';


@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  idProjet: 0;
  projet = {
    secteur: 'Agriculture et développement rural',
    pays: {
      libelle: 'senegal',
      code: 'sn'
    }
  };
  projetSelected: Projet;

 /* projetSelected: Projet = {
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
    objectifSpecs: [],
    ciblesProjets: [],
    infosAdds: [],
    contacts: [],
    experts: [],
    pays: [],
    composantes: [],
    secteurs: [],
    structureResps: '',
    indicateurs: [],
    documents: [],
    financements: []
  };*/

  drapeau: any;
  isImageLoading = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private uploadService: UploadService
  ) {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetProjet(+params['id']));
    });
    this.projetSelected = new Projet();

    this.store.select(getProjet).subscribe((projet) => {
      if (projet !== null) {
        //this.initialize();
        this.projetSelected = projet;
        console.log(this.projetSelected);

        this.drapeau = '../../assets/img/flags/' + this.projetSelected.pays[0].codePays.toLowerCase() + '.svg';
      }
    });
  }

  ngOnInit() {
  }

  initialize() {
    /*this.projetSelected = {
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
      objectifSpecs: [],
      ciblesProjets: [],
      infosAdds: [],
      contacts: [],
      experts: [],
      pays: [],
      composantes: [],
      secteurs: [],
      structureResps: '',
      indicateurs: [],
      documents: [],
      financements: []
    };*/
  }


  getImageUrl(url: string){
    if(url){
      return this.uploadService.getLink(url);
    }else{
      return 'assets/img/default.png';
    }
    
  }

}
