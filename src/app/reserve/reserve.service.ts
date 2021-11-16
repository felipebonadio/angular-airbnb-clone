import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../room/room';
import { RoomService } from '../room/room.service';
import { Reserve } from './reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {


  entityUrl = environment.REST_API_URL + 'reserves';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private roomService: RoomService) { }

  getReserves(): Observable<Reserve[]> {
    return this.http.get<Reserve[]>(this.entityUrl);
  }

  getReservesById(id: string): Observable<Reserve> {
    return this.http.get<Reserve>(this.entityUrl + '/' + id);
  }


  getReservesByGuest(guestId: string): Observable<Reserve[]> {
    return this.http.get<Reserve[]>(this.entityUrl + '/guest/' + guestId);
  }

  createReserve(reserve: Reserve): Observable<Reserve> {
    return this.http.post<Reserve>(this.entityUrl, reserve);
  }

  deleteReserve(reserveId: string): Observable<string> {
    return this.http.delete<string>(this.entityUrl + '/' + reserveId);
  }
  updateReserve(reserveId: string, reserve: Reserve): Observable<Reserve> {
    return this.http.put<Reserve>(this.entityUrl + '/' + reserveId, reserve);
  }
}
