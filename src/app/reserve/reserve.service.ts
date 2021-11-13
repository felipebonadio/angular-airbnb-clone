import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserve } from './reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  entityUrl = environment.REST_API_URL + 'reserves';

  constructor(private http: HttpClient) { }

  getReservers(): Observable<Reserve[]> {
    return this.http.get<Reserve[]>(this.entityUrl);
  }

  getReservesById(id: string): Observable<Reserve> {
    return this.http.get<Reserve>(this.entityUrl + '/' + id);
  }

  getReservesByGuest(host:string):Observable<Reserve[]>{
    return this.http.get<Reserve[]>(this.entityUrl+ '/'+ host);
  }
}
