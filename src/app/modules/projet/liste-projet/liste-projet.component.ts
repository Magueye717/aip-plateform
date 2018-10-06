import { Component, OnInit } from '@angular/core';
import { Observable,  } from 'rxjs';
import { Projet } from '../../../models/projet';
import { Store } from '@ngrx/store';
import { State } from '../config/projets.reducer';
import { getAllProjets } from '../../../config/reducers';

@Component({
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {

  projets: Projet[];

  constructor(
    private store: Store<State>
  ) {
    this.store.select(getAllProjets).subscribe((projets) => {
      this.projets = projets;
      console.log(this.projets);
    });

   }

  ngOnInit() {

  }

}
