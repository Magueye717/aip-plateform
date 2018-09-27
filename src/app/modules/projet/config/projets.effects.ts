import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProjetsActionTypes, ProjetsActions, LoadProjetsSuccess, LoadProjetsError } from './projets.actions';
import { Observable, of } from 'rxjs';
import { ProjetService } from '../../../services/projet.service';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from './projets.reducer';


@Injectable()
export class ProjetsEffects {

  @Effect()
  loadProjets$: Observable<ProjetsActions> = this.actions$
    .pipe(
      ofType(ProjetsActionTypes.LoadProjets),
      withLatestFrom(this.store),
      switchMap(() =>
        this.projetService.listAllProjets()
          .pipe(
            map(data => new LoadProjetsSuccess(data)),
            catchError(err => of(new LoadProjetsError(err)))
          )
      )
    );

  constructor(
    private actions$: Actions,
    private projetService: ProjetService,
    private store: Store<State>
    ) {}
}
