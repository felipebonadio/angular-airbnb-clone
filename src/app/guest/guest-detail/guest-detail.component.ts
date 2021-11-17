import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  
  constructor(private route: ActivatedRoute, private reserveService: ReserveService, private guestService: GuestService, private modalService: ModalService, private formBuilder: FormBuilder) {
    this.guest = {} as Guest;
  }

  guestForm = this.formBuilder.group({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })
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

  onUpdate() {
    this.guest.name = this.guestForm.value.name;
    this.guest.lastName = this.guestForm.value.lastName;
    this.guest.email = this.guestForm.value.email;
    this.guest.password = this.guestForm.value.password;
    this.guest.phone = this.guestForm.value.phone;
    console.warn(this.guest);
    this.guestService.updateGuest(this.guest.id, this.guest).subscribe(
      newGuest => {
        this.guest = newGuest;
      },
      error => this.error = error as any);
  }
}
