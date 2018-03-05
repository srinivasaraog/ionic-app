import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RidehistoryPage } from './ridehistory';

@NgModule({
  declarations: [
    RidehistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RidehistoryPage),
  ],
  exports: [
    RidehistoryPage
  ]
})
export class RidehistoryPageModule {}
