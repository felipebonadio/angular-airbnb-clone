import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms = this.roomService.getRooms();
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {

  }

}
