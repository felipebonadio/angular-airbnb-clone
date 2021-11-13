import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Host } from './host';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  entityUrl = environment.REST_API_URL + 'hosts';

  constructor(private http: HttpClient) {}

  getHosts(): Observable<Host[]> {
    return this.http.get<Host[]>(this.entityUrl);
  }

  getHostsById(id: string): Observable<Host> {
    return this.http.get<Host>(this.entityUrl + '/' + id);
  }
}
