import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
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
  rideDetails={};
  confirmation:any=[];
  notifications:any=[];
  constructor(public rest: Rest,public alertCtrl: AlertController,private toastCtrl: ToastController) {
   
 
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
    console.log("......",response);
     this.confirmation=response.confirmation ? response.confirmation:"";
     if(this.confirmation && this.confirmation[0].ridesInQueue!=="undefined"){
      this.notifications=this.confirmation[0].ridesInQueue;
     }

     
     console.log(this.notifications)
  }


}
