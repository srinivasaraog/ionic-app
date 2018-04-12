import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareridePage } from './shareride';
import { AgmCoreModule } from '@agm/core';
import { alertPage } from '../alert/alert';
//import {NavbarPageModule} from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { NavbarPage } from '../navbar/navbar';


@NgModule({
  declarations: [
    ShareridePage
  ],
  imports: [
    IonicPageModule.forChild(ShareridePage),
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ShareridePageModule {}
