import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from './room';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  rooms: Room[] | undefined;

  ngOnInit(): void {
    const city = String(this.route.snapshot.paramMap.get('city'));

    if (city === '') {
      this.roomService.getRooms().subscribe((rooms) => (this.rooms = rooms));
    } else {
      this.roomService
        .getRoomByCity(city)
        .subscribe((rooms) => (this.rooms = rooms));
    }
  }
}
