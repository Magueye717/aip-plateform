import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/modules/projet/config/projets.reducer';
import { LoadProjets, GetProjet } from './config/projets.actions';
import { isCreated, getAllProjets, loadProjetsError } from '../../config/reducers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private router: Router
    ) {
   }

  ngOnInit() {
    this.store.dispatch(new LoadProjets());

    // Subscribe en cas de réussite ou d'erreur
    this.store.select(loadProjetsError).subscribe((error) => {
      this.loadingError(error);
    });
  }

  /**
   * Afficher un message d'erreur si le chargement des jeux échoue
   * @param error Erreur lancée
   */
  loadingError(error) {
    if (error) {
      alert('Erreur lors du chargement de la liste des projets');
    }
  }

  /**
   * Afficher le message de réussite après avoir exécuté une action spécifique sur le projet
   * @param done true si l'action était terminée ou fausse
   * @param message le message à afficher
   */
  actionSuccess(done: boolean, message: string) {
    if (done) {
      alert(message);
      this.router.navigate(['/projets']);
    }
  }

  /**
   * Affichage du message d'erreur lorsque l'exécution de l'action échoue
   * @param error l'erreur lancée
   * @param message le message à afficher
   */
  actionError(error, message: string) {
    if (error) {
      alert(message);
    }
  }

}
