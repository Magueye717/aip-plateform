import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  ProjetsActionTypes,
  ProjetsActions,
  LoadProjetsSuccess,
  LoadProjetsError,
  GetProjetSuccess,
  GetProjetError,
  GetProjet,
  AddProjet,
  AddProjetSuccess,
  AddProjetError,
  UpdateProjet,
  UpdateProjetSuccess,
  UpdateProjetError,
  RemoveProjet,
  RemoveProjetSuccess,
  RemoveProjetError
} from './projets.actions';
import { Observable, of } from 'rxjs';
import { ProjetService } from '../../../services/projet.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Injectable()
export class ProjetsEffects {

  @Effect()
  loadProjets$: Observable<ProjetsActions> = this.actions$
    .ofType(ProjetsActionTypes.LoadProjets)
    .pipe(
      switchMap(() => this.projetService.listAll()
        .pipe(
          map(data => new LoadProjetsSuccess(data)),
          catchError((err) => of(new LoadProjetsError(err)))
        )
      )
    );

  @Effect()
  getProjet$: Observable<ProjetsActions> = this.actions$
    .ofType(ProjetsActionTypes.GetProjet)
    .map((action: GetProjet) => action.payload)
    .pipe(
      switchMap((id) => this.projetService.findById(id)
        .pipe(
          map((data) => new GetProjetSuccess(data)),
          catchError((err) => of(new GetProjetError(err)))
        )
      )
    );

  @Effect()
  addProjet$: Observable<ProjetsActions> = this.actions$
    .ofType(ProjetsActionTypes.AddProjet)
    .map((action: AddProjet) => action.payload)
    .pipe(
      switchMap((newProjet) => this.projetService.insert(newProjet)
        .pipe(
          map((response) => new AddProjetSuccess(response.idProjet)),
          catchError((err) => of(new AddProjetError(err)))
        )
      )
    );

  @Effect()
  updateProjet$: Observable<ProjetsActions> = this.actions$
    .ofType(ProjetsActionTypes.UpdateProjet)
    .map((action: UpdateProjet) => action.payload)
    .pipe(
      switchMap((projet) => this.projetService.update(projet)
        .pipe(
          map((projetUpdated) => new UpdateProjetSuccess(projetUpdated)),
          catchError((err) => of(new UpdateProjetError(err)))
        )
      )
    );

  @Effect()
  removeProjet$: Observable<ProjetsActions> = this.actions$
  .ofType(ProjetsActionTypes.RemoveProjet)
  .map((action: RemoveProjet) => action.payload)
  .pipe(
    switchMap((id) => this.projetService.delete(id)
      .pipe(
        map((projetDeleted) => new RemoveProjetSuccess(projetDeleted)),
        catchError((err) => of(new RemoveProjetError(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projetService: ProjetService,
    ) {}
}
