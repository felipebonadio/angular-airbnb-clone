import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from './room';
import { RoomService } from './room.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  
  error: Error | undefined;
  rooms: Room[] | undefined;

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

  ngOnInit(): void {
    const city = String(this.route.snapshot.paramMap.get('city'));

    if (city === '') {
      this.roomService
        .getRooms()
        .pipe(
          map((obj) => obj),
          catchError((e) => this.errorHandler(e))
        )
        .subscribe((rooms) => (this.rooms = rooms));
    } else {
      this.roomService
        .getRoomByCity(city)
        .pipe(
          map((obj) => obj),
          catchError((e) => this.errorHandler(e))
        )
        .subscribe((rooms) => (this.rooms = rooms));
    }
  }
}
