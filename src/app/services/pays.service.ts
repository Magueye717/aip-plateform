import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pays } from '../models/Pays';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaysService {

  apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = `${environment.apiUrl}/ProjetService/api/pays`;
  }

  /**
   * Trouver tous les éléments
   * @returns obtenir la liste des objets trouvés
   */
  listAll(): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.apiUrl);
  }

  /**
   * Trouver un objet par son id
   * @param id l'identifiant de l'objet
   * @returns obtenir l'objet trouvé
   */
  findByCode(type: string): Observable<Pays> {
    return this.http.get<Pays>(this.apiUrl+'/code/'+type);
  }

  findByIdActeur(idActeur: number): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.apiUrl+'/acteur/'+idActeur);
  }

  findPaysProjet(): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.apiUrl+'/paysprojet/');
  }

  

}
