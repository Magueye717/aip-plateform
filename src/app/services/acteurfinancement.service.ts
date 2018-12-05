import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActeurFinancement } from '../models/ActeurFinancement';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ActeurFinancementService {

  apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = `${environment.apiUrl}/ProjetService/api/acteurFinancement`;
  }

  /**
   * Trouver tous les éléments
   * @returns obtenir la liste des objets trouvés
   */
  listAll(): Observable<ActeurFinancement[]> {
    return this.http.get<ActeurFinancement[]>(this.apiUrl);
  }

  /**
   * Trouver un objet par son id
   * @param id l'identifiant de l'objet
   * @returns obtenir l'objet trouvé
   */
  findByTypeActeur(type: string): Observable<ActeurFinancement[]> {
    return this.http.get<ActeurFinancement[]>(this.apiUrl+'/type/'+type);
  }

  

}
