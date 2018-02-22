import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareridePage } from './shareride';
import { AgmCoreModule } from '@agm/core';
import { alertPage } from '../alert/alert';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ShareridePage,
    alertPage
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
