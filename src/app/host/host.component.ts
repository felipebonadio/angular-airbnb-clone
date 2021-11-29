import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  deleteId: string | undefined;


  constructor(private hostService: HostService, private route: ActivatedRoute, private modalService: ModalService, private formBuilder: FormBuilder, private router: Router) {
    this.host = {} as Host;
  }

  ngOnInit(): void {
    this.hostService.getHosts().subscribe((hosts) => (this.hosts = hosts));
  }

  openModalDelete(id: string, hostId: string) {
    this.deleteId = hostId;
    this.modalService.open(id);
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

  onSave(host: Host) {
    this.host.name = this.hostForm.value.name;
    this.host.lastName = this.hostForm.value.lastName;
    this.host.email = this.hostForm.value.email;
    this.host.password = this.hostForm.value.password;
    this.host.phone = this.hostForm.value.phone;    
    this.hostService.createHost(host).subscribe(
      newHost => {
        this.host = newHost;
      },
      error => this.error = error as any);

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';

      this.router.navigateByUrl(`/hosts`);
    
  }

  onDelete(host: Host) {
    this.hostService.deleteHost(host.id).subscribe(
      response => {
        this.host = {} as Host;
        this.closeModal('delete'),
          this.openModal('deleteOk');
      },
      error => this.error = error as any);

  }

}
