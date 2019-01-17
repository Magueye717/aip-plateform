import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secteur } from '../models/Secteur';
import { SecteurFavoris }  from '../dto/SecteurFavoris';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SecteurService {

  apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = `${environment.apiUrl}/ProjetService/api/secteurs`;
  }

  /**
   * Trouver tous les éléments
   * @returns obtenir la liste des objets trouvés
   */
  listAll(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.apiUrl);
  }

  /**
   * Trouver un objet par son id
   * @param id l'identifiant de l'objet
   * @returns obtenir l'objet trouvé
   */
  findByActeurAndPays(idActeur: number, codePays: string): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(this.apiUrl+'/acteur/'+idActeur+'/pays/'+codePays);
  }


  findSecteursFavoris(): Observable<SecteurFavoris[]> {
    let top = 5;
    return this.http.get<SecteurFavoris[]>(this.apiUrl+'/favoris/'+top);
  }
  

}
