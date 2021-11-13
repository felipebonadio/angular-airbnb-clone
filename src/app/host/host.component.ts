import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Host } from './host';
import { HostService } from './host.service';


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  hosts: Host[] | undefined;
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
    this.showMessage('Erro ao trazer a lista de anfitriões', true);
    this.error = e;
    return EMPTY;
  }


  constructor(private hostService: HostService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.hostService.getHosts().subscribe((hosts) => (this.hosts = hosts));
  }
}
