import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  entityUrl = environment.REST_API_URL + 'rooms';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.entityUrl);
  }

  getRoomByCity(city: string): Observable<Room[]> {
    return this.http.get<Room[]>(this.entityUrl + '/city/' + city);
  }

  getRoomByHost(host:string):Observable<Room[]>{
    return this.http.get<Room[]>(this.entityUrl+ '/'+ host);
  }

  getRoomById(id: string): Observable<Room> {
    return this.http.get<Room>(this.entityUrl + '/' + id);
  }
}
