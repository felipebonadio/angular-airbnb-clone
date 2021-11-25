import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../../guest/guest.service';
import { CookieService } from '../../cookie.service';
import { Auth } from '../Auth';
import { Guest } from '../../guest/guest';

@Component({
  selector: 'app-guest-auth',
  templateUrl: './guest-auth.component.html',
  styleUrls: ['./guest-auth.component.css']
})
export class GuestAuthComponent implements OnInit {

    public auth: Auth = {
      email: "",
      password: ""
    };
  
    constructor(private route: Router, private guestService: GuestService, private cookieService: CookieService) { }
  
    ngOnInit(): void { }
  
    onSubmit(): Boolean {
      if (this.auth.email.length === 0 || this.auth.password.length === 0) {
        return false;
      }
  
      this.guestService.getGuests().subscribe((response: any) => {
        const loggedGuest = response.find((guest: Guest) => this.auth.email === guest.email && this.auth.password === guest.password);
  
        if (typeof loggedGuest === typeof {}) {
          this.cookieService.setCookie("guest.email", loggedGuest.email, 5);
          this.cookieService.setCookie("guest.name", loggedGuest.name, 5);
          this.cookieService.setCookie("guest.socialname", loggedGuest.socialname, 5);
          
          this.guestService.guest = loggedGuest;
          /* Set an user cookie here... */
          this.route.navigateByUrl('/');
        }
      });
  
      return true;
    }
  }
