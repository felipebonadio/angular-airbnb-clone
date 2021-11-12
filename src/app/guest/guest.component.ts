import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor() { }

  ngOnInit(): void {   
  }
  
}
