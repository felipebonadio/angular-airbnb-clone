import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guest } from '../guest/guest';
import { GuestService } from '../guest/guest.service';
import { Room } from '../room/room';
import { RoomService } from '../room/room.service';
import { Reserve } from './reserve';
import { ReserveService } from './reserve.service';
import * as moment from 'moment';
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  reserve: Reserve;
  room: Room;
  guests: Guest[];
  error: Error | undefined;


  constructor(private roomService: RoomService, private route: ActivatedRoute, private guestService: GuestService, private formBuilder: FormBuilder, private reserveService: ReserveService) {
    this.room = {} as Room;
    this.guests = [];
    this.reserve = {} as Reserve;
  }

  reserveForm = this.formBuilder.group({
    checkInDate: '',
    checkOutDate: '',
    selectedGuest: ''
  })

  ngOnInit(): void {
    const paramId = String(this.route.snapshot.paramMap.get("id"));
    this.roomService.getRoomById(paramId).subscribe(room => this.room = room);
    this.guestService.getGuests().subscribe(guests => this.guests = guests);
  }


  onSave(reserve: Reserve) {
    this.reserve.checkIn = moment(this.reserveForm.value.checkInDate).format('DD/MM/YYYY');
    this.reserve.checkOut = moment(this.reserveForm.value.checkOutDate).format('DD/MM/YYYY');
    this.reserve.room = this.room;
    this.reserve.guest = this.reserveForm.value.selectedGuest;

    this.reserveService.createReserve(reserve).subscribe(
      newReserve => {
        this.reserve = newReserve;
      },
      error => this.error = error as any);
  }



  changeGuest(value: any) {
    console.log(value);
  }

  onDelete(reserve: Reserve) {
    this.reserveService.deleteReserve(reserve.id).subscribe(
      response => {
        this.reserve = {} as Reserve;
      },
      error => this.error = error as any);
  }
  onUpdate() {
    this.reserve.checkIn = this.reserveForm.value.checkInDate;
    this.reserve.checkOut = this.reserveForm.value.checkOutDate;
    this.reserve.guest = this.reserveForm.value.guestOption;
    this.room.id = String(this.route.snapshot.paramMap.get("id"));

    this.reserveService.updateReserve(this.reserve.id, this.reserve).subscribe(
      newReserve => {
        this.reserve = newReserve;
      },
      error => this.error = error as any);

  }


}



