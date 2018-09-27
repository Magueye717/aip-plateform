import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/modules/projet/config/projets.reducer';
import { LoadProjets } from './config/projets.actions';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  constructor(private store: Store<State>) {
   }

  ngOnInit() {
    this.store.dispatch(new LoadProjets);
  }


}
