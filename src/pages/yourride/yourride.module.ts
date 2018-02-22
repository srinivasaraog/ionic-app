import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourridePage } from './yourride';
import { KeysPipe } from '../../app/pipes/pipe';
@NgModule({
  declarations: [
    YourridePage,
    KeysPipe,
  ],
  imports: [
    IonicPageModule.forChild(YourridePage),
  ],
  
})
export class YourridePageModule {}
