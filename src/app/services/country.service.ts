import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getFlagByCountry(countryCode: string): Observable<Blob> {
    const httpheaders = new HttpHeaders();
    httpheaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpheaders.append('responseType' , 'blob');

    return this.http.get('https://www.countryflags.io/' + countryCode + '/shiny/66.png', { responseType: 'blob', headers: httpheaders });
  }
}
