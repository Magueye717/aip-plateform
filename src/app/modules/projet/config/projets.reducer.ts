import { ProjetsActions, ProjetsActionTypes } from './projets.actions';
import { Projet } from '../../../models/projet';
import { HttpErrorResponse } from '@angular/common/http';

export interface State {
  loading: boolean;
  data: Projet[] | null;
  error: HttpErrorResponse | null;
}

export const initialState: State = {
  loading: false,
  data: [],
  error: null
};

export function reducer(state = initialState, action: ProjetsActions): State {
  switch (action.type) {

    case ProjetsActionTypes.LoadProjets:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ProjetsActionTypes.LoadProjetsSuccess:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case ProjetsActionTypes.LoadProjetsError:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

