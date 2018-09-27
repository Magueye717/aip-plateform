import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Projet } from '../../../models/projet';

export enum ProjetsActionTypes {
  LoadProjets = '[Projets] Load Projets',
  LoadProjetsSuccess = '[Projets] Load Projets Success',
  LoadProjetsError = '[Projets] Load Projets Error'
}

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

export type ProjetsActions =
 LoadProjets | LoadProjetsSuccess | LoadProjetsError;
