import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Projet } from '../../../models/projet';

export enum ProjetsActionTypes {
  LoadProjets = '[Projets] Load Projets',
  LoadProjetsSuccess = '[Projets] Load Projets Success',
  LoadProjetsError = '[Projets] Load Projets Error',
  GetProjet = '[Projet] Get Projet',
  GetProjetSuccess = '[Projet] Get Projet Success',
  GetProjetError = '[Projet] Get Projet Error',
  AddProjet = '[New Projet] Add New Projet',
  AddProjetSuccess = '[New Projet] Add New Projet Success',
  AddProjetError = '[New Projet] Add New Projet Error',
  RemoveProjet = '[Remove Projet] Remove Projet',
  RemoveProjetSuccess = '[Remove Projet] Remove Projet Success',
  RemoveProjetError = '[Remove Projet] Remove Projet Error',
  UpdateProjet = '[Update Projet] Update Projet',
  UpdateProjetSuccess = '[Update Projet] Update Projet Success',
  UpdateProjetError = '[Update Projet] Update Projet Error'
}

/**
 * Charger tous les projets
 */
export class LoadProjets implements Action {
  readonly type = ProjetsActionTypes.LoadProjets;
}

export class LoadProjetsSuccess implements Action {
  readonly type = ProjetsActionTypes.LoadProjetsSuccess;

  constructor(public payload: Projet[]) {}
}

export class LoadProjetsError implements Action {
  readonly type = ProjetsActionTypes.LoadProjetsError;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Charger un projet par son id
 */
export class GetProjet implements Action {
  readonly type = ProjetsActionTypes.GetProjet;

  constructor(public payload: number) {}
}

export class GetProjetSuccess implements Action {
  readonly type = ProjetsActionTypes.GetProjetSuccess;

  constructor(public payload: Projet) {}
}

export class GetProjetError implements Action {
  readonly type = ProjetsActionTypes.GetProjetError;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Ajouter un nouveau projet
 */
export class AddProjet implements Action {
  readonly type = ProjetsActionTypes.AddProjet;

  constructor(public payload: Projet) {}
}

export class AddProjetSuccess implements Action {
  readonly type = ProjetsActionTypes.AddProjetSuccess;

  constructor(public payload: number) {}
}

export class AddProjetError implements Action {
  readonly type = ProjetsActionTypes.AddProjetError;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Modifier un projet par son id
 */
export class UpdateProjet implements Action {
  readonly type = ProjetsActionTypes.UpdateProjet;

  constructor(public payload: Projet) {}
}

export class UpdateProjetSuccess implements Action {
  readonly type = ProjetsActionTypes.UpdateProjetSuccess;

  constructor(public payload: Projet) {}
}

export class UpdateProjetError implements Action {
  readonly type = ProjetsActionTypes.UpdateProjetError;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Supprimer un projet par son id
 */
export class RemoveProjet implements Action {
  readonly type = ProjetsActionTypes.RemoveProjet;

  constructor(public payload: number) {}
}

export class RemoveProjetSuccess implements Action {
  readonly type = ProjetsActionTypes.RemoveProjetSuccess;

  constructor(public payload: Projet) {}
}

export class RemoveProjetError implements Action {
  readonly type = ProjetsActionTypes.RemoveProjetError;

  constructor(public payload: HttpErrorResponse) {}
}



export type ProjetsActions =
 LoadProjets | LoadProjetsSuccess | LoadProjetsError
 | GetProjet | GetProjetSuccess | GetProjetError
 | AddProjet | AddProjetSuccess | AddProjetError
 | UpdateProjet |UpdateProjetSuccess | UpdateProjetError
 | RemoveProjet | RemoveProjetSuccess | RemoveProjetError
 ;
