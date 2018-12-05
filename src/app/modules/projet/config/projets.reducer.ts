import { ProjetsActions, ProjetsActionTypes } from './projets.actions';
import { Projet } from '../../../models/projet';
import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  loading: boolean;
  loaded: boolean;
  search: boolean;
  founded: boolean;
  data: Projet[] | null;
  selected: Projet;
  done: boolean;
  logs: {
    type: string,
    message: string
  };
}

export const initialState: State = {
  loading: false,
  search: false,
  loaded: false,
  founded: false,
  data: [],
  selected: null,
  done: false,
  logs: null
};


export function reducer(state = initialState, action: ProjetsActions): State {
  switch (action.type) {

    /**
     * Charger tous les projets
     */
    case ProjetsActionTypes.LoadProjets:
      return {
        ...state,
        loading: true,
        logs: {
          type: 'LOADING',
          message: 'Chargement de tous les projets....'
        }
      };

    case ProjetsActionTypes.LoadProjetsSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
        done: true,
        logs: {
          type: 'SUCCESS',
          message: 'Tous les projets ont été chargés avec succès'
        }
      };

    case ProjetsActionTypes.LoadProjetsError:
      return {
        ...state,
        loading: false,
        loaded: false,
        logs: {
          type: 'ERROR',
          message: 'Error de chargement : ' + action.payload.message
        }
      };

    /**
     * Charger un projet par son id
     */
    case ProjetsActionTypes.GetProjet:
      return {
        ...state,
        loading: true,
        logs: {
        type: 'LOADING',
          message: 'Chargement du projet.... '
        }
      };

    case ProjetsActionTypes.GetProjetSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        selected: action.payload,
        logs: {
          type: 'SUCCESS',
          message: 'Le projet a été chargé avec succès'
        }
      };

    case ProjetsActionTypes.GetProjetError:
      return {
        ...state,
        loading: false,
        loaded: false,
        logs: {
        type: 'ERROR',
          message: 'Error de chargement : ' + action.payload.message
        }
      };

    /**
     * Ajouter un nouveau projet
     */
    case ProjetsActionTypes.AddProjet:
      return {
        ...state,
        loading: true,
        selected: action.payload,
        logs: {
          type: 'LOADING',
          message: 'Ajout du nouveau projet en cours....'
        }
      };

    case ProjetsActionTypes.AddProjetSuccess:
      const newProjet = {
        ...state.selected,
        id: action.payload
      };
      const data = {
        ...state.data,
        newProjet
      };
      return {
        ...state,
        data,
        loading: false,
        done: true,
        logs: {
          type: 'SUCCESS',
          message: 'Le nouveau projet a été ajouté avec succès'
        }
      };

    case ProjetsActionTypes.AddProjetError:
      return {
        ...state,
        loading: false,
        done: true,
        logs: {
          type: 'ERROR',
          message: 'Erreur lors de l\'ajout du nouveau projet' + action.payload
        }
      };

    /**
     * Modifier un projet par son id
     */
    case ProjetsActionTypes.UpdateProjet:
      return {
        ...state,
        loading: true,
        selected: action.payload,
        logs: {
          type: 'LOADING',
          message: 'Modification du projet en cours......'
        }
      };

    case ProjetsActionTypes.UpdateProjetSuccess:
    {
      const index = state
        .data
        .findIndex(h => h.idProjet === state.selected.idProjet);
      if (index >= 0) {
        // tslint:disable-next-line:no-shadowed-variable
        const data = [
          ...state.data.slice(0, index),
          state.selected,
          ...state.data.slice(index + 1)
        ];
        return {
          ...state,
          data,
          done: true,
          logs: {
            type: 'SUCCESS',
            message: 'Le projet a été modifié avec succès'
          }
        };
      }
      return state;
    }

    case ProjetsActionTypes.UpdateProjetError:
      return {
        ...state,
        loading: false,
        done: true,
        logs: {
          type: 'ERROR',
          message: 'Erreur lors de la modification du projet' + action.payload
        }
      };

    /**
     * Supprimer un projet par son id
     */
    case ProjetsActionTypes.RemoveProjet:
    {
      const selected = state.data.find(h => h.idProjet === action.payload);
      return {
        ...state,
        loading: true,
        selected,
        logs: {
          type: 'LOADING',
          message: 'Suppression du projet en cours.....'
        }
      };
    }

    case ProjetsActionTypes.RemoveProjetSuccess:
    {
      // tslint:disable-next-line:no-shadowed-variable
      const data = state.data.filter(h => h.idProjet !== state.selected.idProjet);
      return {
        ...state,
        data,
        done: true,
        logs: {
          type: 'SUCCESS',
          message: 'Le projet a été supprimé avec succès'
        }
      };
    }

    case ProjetsActionTypes.RemoveProjetError:
    return {
      ...state,
      done: true,
      logs: {
        type: 'ERROR',
        message: 'Erreur lors de la suppression du projet' + action.payload
      }
    };

    //adg
    case ProjetsActionTypes.SearchProjets:
      return {
        ...state,
        search: true,
        logs: {
          type: 'SEARCH',
          message: 'Chargement de tous les projets....'
        }
      };

    case ProjetsActionTypes.SearchProjetsSucess:
      return {
        ...state,
        search: false,
        founded: true,
        data: action.payload,
        done: true,
        logs: {
          type: 'FOUNDED',
          message: 'Tous les projets ont été chargés avec succès'
        }
      };

    case ProjetsActionTypes.SearchProjetsError:
      return {
        ...state,
        loading: false,
        loaded: false,
        logs: {
          type: 'ERROR',
          message: 'Error de chargement : ' + action.payload.message
        }
      };

    default:
      return state;
  }
}
