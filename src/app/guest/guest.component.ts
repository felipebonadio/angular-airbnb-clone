import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guest } from './guest';
import { GuestService } from './guest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModalService } from '../modal/modal.service';
import { ReserveService } from '../reserve/reserve.service';
import { Reserve } from '../reserve/reserve';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  guests: Guest[] | undefined;
  reserves: Reserve[] | undefined;
  guestId: string;
  constructor(private guestService: GuestService, private route: ActivatedRoute, private modalService: ModalService, private reserveService: ReserveService) {
    this.guestId = "inicializei";
  }

  ngOnInit(): void {
    this.guestService.getGuests().subscribe((guests) => (this.guests = guests));
  }

  showReserves(modalId: string) {
    this.reserveService.getReservesByGuest(this.guestId).subscribe((reserves) => (this.reserves = reserves));
    this.openModal(modalId);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
