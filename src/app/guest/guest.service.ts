import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guest } from './guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  entityUrl = environment.REST_API_URL + 'guests';

  constructor(private http: HttpClient) { }

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.entityUrl);
  }

  getGuestById(id: string): Observable<Guest> {
    return this.http.get<Guest>(this.entityUrl + '/' + id);
  }

  createGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.entityUrl, guest);
  }
}
