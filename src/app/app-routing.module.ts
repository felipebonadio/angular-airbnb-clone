import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestDetailComponent } from './guest/guest-detail/guest-detail.component';
import { GuestComponent } from './guest/guest.component';
import { HomeComponent } from './home/home.component';
import { HostDetailComponent } from './host/host-detail/host-detail.component';
import { HostComponent } from './host/host.component';
import { ReserveComponent } from './reserve/reserve.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'rooms',
    component: RoomComponent,
  },
  {
    path: 'rooms/:city',
    component: RoomComponent,
  },
  {
    path: 'rooms/:id',
    component: RoomComponent,
  },
  {
    path: 'guests',
    component: GuestComponent,
  },
  {
    path: 'guests/:id',
    component: GuestDetailComponent,
  },
  {
    path: 'hosts',
    component: HostComponent,
  },
  {
    path: 'hosts/:id',
    component: HostDetailComponent,
  },
  {
    path: 'reserves/:id',
    component: ReserveComponent,
  },
  {
    path: 'reserves',
    component: ReserveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
