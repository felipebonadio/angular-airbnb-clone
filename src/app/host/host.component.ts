import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Host } from './host';
import { HostService } from './host.service';
import { ModalService } from '../modal/modal.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

  host: Host;
  hosts: Host[] | undefined;
  error: Error | undefined;

  constructor(private hostService: HostService, private route: ActivatedRoute, private snackBar: MatSnackBar, private modalService: ModalService, private formBuilder: FormBuilder) {
    this.host = {} as Host;
   }

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
  

  ngOnInit(): void {
    this.hostService.getHosts().subscribe((hosts) => (this.hosts = hosts));
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  hostForm = this.formBuilder.group({
    name:'',
    lastName:'',
    email: '',
    password: '',
    phone:''
  })
  
  onSubmit(host: Host) {
    host.id = '';
    host.email='';
    host.password='';
    host.name='';
    host.lastName='';
    host.phone='';    
    this.hostService.createHost(host).subscribe(
      newHost => {
        this.host = newHost;    
      },
      error => this.error = error as any);
  }
}
