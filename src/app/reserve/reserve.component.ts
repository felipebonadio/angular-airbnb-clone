import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../room/room';
import { RoomService } from '../room/room.service';
import { Reserve } from './reserve';
import { ReserveService } from './reserve.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
 

  constructor() {}

  ngOnInit(): void {}

  

}
