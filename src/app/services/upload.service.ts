import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', `${environment.apiUrlMedia}/images`, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  uploadFile(file: File): Observable<any> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${environment.apiUrlMedia}/images`, formdata , {headers: headers});
  }

  getLink(fileName: string){
    let urlImgage = `${environment.apiUrlMedia}/images/`+fileName;
    console.log("urlmage", urlImgage);
    return urlImgage;
  }
}
