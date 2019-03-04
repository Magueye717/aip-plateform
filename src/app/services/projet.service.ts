import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';
import { SearchProjetDTO } from '../dto/SearchProjetDTO';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }

  /**
   * Trouver tous les éléments
   * @returns obtenir la liste des objets trouvés
   */
  listAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${environment.apiUrl}/ProjetService/api/projets`);
  }

  /**
   * Trouver un objet par son id
   * @param id l'identifiant de l'objet
   * @returns obtenir l'objet trouvé
   */
  findById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${environment.apiUrl}/ProjetService/api/projets/` + id);
  }

  /**
   * Insérer des données
   * @param data l'objet contenant les données à insérer
   * @return obtenir une réponse du serveur
   */
  public insert(data: Projet): Observable<Projet> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json charset=utf-8');

    return this.http.post<Projet>(`${environment.apiUrl}/ProjetService/api/projets`, data, {headers: headers});
  }

  /**
   * Modifier un objet spécifique dans la base de données
   * @param data l'objet à modifier
   * @returns obtenir une réponse du serveur
   */
  public update(data: Projet): Observable<Projet> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json charset=utf-8');

    return this.http.put<Projet>(`${environment.apiUrl}/ProjetService/api/projets` + data.idProjet, data, {headers: headers});
  }

  /**
   * Supprimer un objet par son identifiant
   * @param id l'identifiant de l'objet
   * @returns obtenir une réponse du serveur
   */
  public delete(id: number): Observable<Projet> {
    return this.http.delete<Projet>(`${environment.apiUrl}/ProjetService/api/projets/` + id);
  }

    /**
   * Trouver tous les éléments
   * @returns obtenir la liste des objets trouvés
   */
  searchProjet(dto: SearchProjetDTO): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${environment.apiUrl}/ProjetService/api/projets/acteur/`+dto.idActeur+'/pays/'+dto.codePays+'/secteur/'+dto.idSecteur);
  }


  findProjetByCodePays(codePays: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${environment.apiUrl}/ProjetService/api/projets/pays/`+codePays);
  }
}
