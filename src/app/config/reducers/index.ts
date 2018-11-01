import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProjets from '../../modules/projet/config/projets.reducer';
import { ProjetsActionTypes } from '../../modules/projet/config/projets.actions';

export interface State {

  projets: fromProjets.State;
}

export const reducers: ActionReducerMap<State> = {

  projets: fromProjets.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/**
 * Selectors For Projet
 */

// GET DATA
export const getProjetsState = createFeatureSelector<fromProjets.State>('projets');
export const getAllProjets = createSelector(getProjetsState, state => {
  if (state.loaded) {
    return state.data;
  } else {
    return null;
  }
});
export const getProjet = createSelector(getProjetsState, state => {
  if (state.done) {
    return state.selected;
  } else {
    return null;
  }
});
export const isCreated = createSelector(getProjetsState, state =>
  state.done && state.logs.type === 'SUCCESS'
);
export const isUpdated = createSelector(getProjetsState, state =>
  state.done && state.logs.type === 'SUCCESS'
);
export const isDeleted = createSelector(getProjetsState, state =>
  state.done && state.logs.type === 'SUCCESS'
);

// GET LOADING
export const getIsLoading = createSelector(getProjetsState, state => state.loading);

// GET ERROR
export const getDeleteError = createSelector(getProjetsState, state => state.logs.type === 'ERROR');
export const getCreateError = createSelector(getProjetsState, state => state.logs.type === 'ERROR');
export const getUpdateError = createSelector(getProjetsState, state => state.logs.type === 'ERROR');
export const loadProjetsError = createSelector(getProjetsState, state => state.logs.type === 'ERROR');
export const getProjetError = createSelector(getProjetsState, state =>  state.logs.type === 'ERROR');
/**
 * ========================================================================================================
 */
