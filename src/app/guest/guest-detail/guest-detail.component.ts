import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modal/modal.service';
import { Reserve } from 'src/app/reserve/reserve';
import { ReserveService } from 'src/app/reserve/reserve.service';
import { Guest } from '../guest';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.component.html',
  styleUrls: ['./guest-detail.component.css']
})
export class GuestDetailComponent implements OnInit {
  error: Error | undefined;
  reserves: Reserve[] | undefined;
  guest: Guest;
  constructor(private route: ActivatedRoute, private reserveService: ReserveService, private guestService: GuestService, private modalService: ModalService) { 
    this.guest = {} as Guest;
  }

  ngOnInit(): void {
    const paramId = String(this.route.snapshot.paramMap.get("id"));
    this.reserveService.getReservesByGuest(paramId).subscribe((reserves) => this.reserves = reserves);
    this.guestService.getGuestById(paramId).subscribe((guest) => this.guest = guest);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  onDelete(guest: Guest) {
    this.guestService.deleteGuest(guest.id).subscribe(
      response => {
        this.guest = {} as Guest;
        this.closeModal('deleteGuest'),
          this.openModal('deleteOk');
      }, error => this.error = error as any);
  }
}
