import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }

  listAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${environment.apiUrl}/ProjetService/api/projets`);
  }
}
