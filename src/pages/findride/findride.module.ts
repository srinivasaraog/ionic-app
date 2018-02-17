import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { FindridePage } from './findride';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    FindridePage,
  ],
  imports: [
    IonicPageModule.forChild(FindridePage),
    AgmCoreModule.forRoot({
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [FindridePage]
})
export class FindridePageModule {}
