import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rest } from '../../providers/rest';

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  rideDetails={}
  constructor(public rest: Rest) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    
  }
  ngOnInit(){
    this.rideDetails={
      userId:sessionStorage.getItem("userId")
    }
    this.rest.getNotifications(this.rideDetails).subscribe(
      response => this.navigator(response),
      err => console.log(err)

     );
  }
  navigator(response){
    console.log("......",response)
  }
}
