import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Host } from '../host';
import { HostService } from '../host.service';
import { ModalService } from '../../modal/modal.service';
import { FormBuilder } from '@angular/forms';
import { RoomService } from 'src/app/room/room.service';
import { Room } from 'src/app/room/room';



@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.css']
})
export class HostDetailComponent implements OnInit {

  host: Host;
  error: Error | undefined;


  constructor(private hostService: HostService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private roomService: RoomService) {
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
    const paramId = String(this.route.snapshot.paramMap.get("id"));
    this.hostService.getHostsById(paramId).subscribe(host => this.host = host);
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  hostForm = this.formBuilder.group({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  })

  roomForm = this.formBuilder.group({
    title: '',
    description: '',
    city: '',
    price: ''
  })

  onDelete(host: Host) {
    this.hostService.deleteHost(host.id).subscribe(
      response => {
        this.host = {} as Host;
        this.closeModal('delete'),
          this.openModal('deleteOk');
      },
      error => this.error = error as any);
  }

  onUpdate() {
    this.host.name = this.hostForm.value.name;
    this.host.lastName = this.hostForm.value.lastName;
    this.host.email = this.hostForm.value.email;
    this.host.password = this.hostForm.value.password;
    this.host.phone = this.hostForm.value.phone;
    this.hostService.updateHost(this.host.id, this.host).subscribe(
      newHost => {
        this.host = newHost;
      },
      error => this.error = error as any);
  }

  createRoom() {
    let room = {} as Room;
    room.title = this.roomForm.value.title;
    room.description = this.roomForm.value.description;
    room.city = this.roomForm.value.city;
    room.price = this.roomForm.value.price;
    room.host = this.host;
    this.roomService.createRoom(room).subscribe(
      newRoom => {
        room = newRoom;
      },
      error => this.error = error as any);
  }

}
