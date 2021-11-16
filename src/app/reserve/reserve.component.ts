import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  selected = 'option2';

}
