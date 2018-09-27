import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProjets from '../../modules/projet/config/projets.reducer';

export interface State {

  projets: fromProjets.State;
}

export const reducers: ActionReducerMap<State> = {

  projets: fromProjets.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getProjetsState = createFeatureSelector<fromProjets.State>('Projets');
export const getProjets = createSelector(getProjetsState, state => state.data);
export const getIsLoading = createSelector(getProjetsState, state => state.loading);
