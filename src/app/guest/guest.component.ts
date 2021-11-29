import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guest } from './guest';
import { GuestService } from './guest.service';
import { ModalService } from '../modal/modal.service';
import { ReserveService } from '../reserve/reserve.service';
import { Reserve } from '../reserve/reserve';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  guest: Guest;
  guests: Guest[] | undefined;
  reserves: Reserve[] | undefined;
  guestId: string;
  error: Error | undefined;
  constructor(private guestService: GuestService, private route: ActivatedRoute, private modalService: ModalService, private reserveService: ReserveService, private formBuilder: FormBuilder, private router: Router) {
    this.guestId = "inicializei";
    this.guest = {} as Guest;
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

  guestForm = this.formBuilder.group({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })

  onSave(guest: Guest) {
    this.guest.name = this.guestForm.value.name;
    this.guest.lastName = this.guestForm.value.lastName;
    this.guest.email = this.guestForm.value.email;
    this.guest.password = this.guestForm.value.password;
    this.guest.phone = this.guestForm.value.phone;
    this.guestService.createGuest(guest).subscribe(
      newGuest => {
        this.guest = newGuest;
      },
      error => this.error = error as any);

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';

      this.router.navigateByUrl(`/guests`);
  }



}
