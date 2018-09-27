import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../../../models/projet';
import { Store } from '@ngrx/store';
import { State } from 'src/app/modules/projet/config/projets.reducer';
import { getProjets, getIsLoading } from '../../../config/reducers';
import { LoadProjets } from '../config/projets.actions';

@Component({
  selector: 'app-liste-projet',
  templateUrl: './liste-projet.component.html',
  styleUrls: ['./liste-projet.component.css']
})
export class ListeProjetComponent implements OnInit {
   projets$: Observable<Projet[]>;
   isLoading$: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) {
    this.projets$ = this.store.select(getProjets);
    this.isLoading$ = this.store.select(getIsLoading);
   }

  ngOnInit() {
    this.store.dispatch(new LoadProjets);
    console.log(this.isLoading$);
  }

}
