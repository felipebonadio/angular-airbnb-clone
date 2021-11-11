import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  entityUrl = environment.REST_API_URL + 'rooms';

  constructor(private http: HttpClient) {
  }

  getRooms(): Observable<Room[]> {
    console.log(this.entityUrl);
    return this.http.get<Room[]>(this.entityUrl)
  }
}
