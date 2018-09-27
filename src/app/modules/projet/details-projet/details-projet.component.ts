import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  idProjet: number;
  projet = {
    idProjet: 0,
    titre: 'Projet d’approvisionnement en eau et d’assainissement en milieu rural au Sénégal ',
    objectifGeneral: 'The development objective of Rural Water Supply and Sanitation Project for Senegal is to increase access '
                     + 'to improved water and sanitation services in selected rural areas and strengthen capacity for water resources '
                     + 'management. This project has four components. 1) The first component, Rural Water Supply, aims to improve water '
                     + 'services and expand access through the following sub-components: (i) Upgrading of piped water systems to increase '
                     + 'water availability and quality, in selected areas; and (ii) Development of access to water in selected areas.',
    secteur: 'Agriculture et développement rural',
    pays: {
      libelle: 'senegal',
      code: 'sn'
    }
  };
  drapeau: any;
  isImageLoading = false;

  constructor(private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit() {
    this.drapeau = '../../assets/img/flags/' + this.projet.pays.code + '.svg';

    this.route.params.subscribe(params => {
      this.projet.idProjet = params['idProjet']; // (+) converts string 'id' to a number
   });
  }

}
