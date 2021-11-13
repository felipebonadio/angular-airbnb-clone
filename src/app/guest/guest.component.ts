import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guest } from './guest';
import { GuestService } from './guest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  guests : Guest[] | undefined;
  error: Error | undefined;

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-succes'],
    });
  }

  errorHandler(e: Error): Observable<any> {
    this.showMessage('Nenhum local encontrado nesta cidade', true);
    this.error = e;
    return EMPTY;
  }


  constructor(private guestService: GuestService, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {   
    this.guestService.getGuests().subscribe((guests) => (this.guests = guests));
  }
  
}
