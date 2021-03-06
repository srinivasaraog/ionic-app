import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Rest } from '../../providers/rest';
import { car } from '../../assets/icon/car';
import { LoginPage } from '../login/login';



/**
 * Generated class for the RidehistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ridehistory',
  templateUrl: 'ridehistory.html',
})
export class RidehistoryPage {
  data: any;
  isValid: boolean = false;
  ridesAvailable = [];
  profile: any;
  rideDetails:any=[];
  yourRideDetails={
    userId:'',
    date:''
   
  }
  deleterideDetails={
    userId:'',
    date:'',
  };
  userId:any;

  constructor( public rest: Rest,private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RidehistoryPage');
  }

ngOnInit(){
  console.log(".....hiiiiii")
  this.userId = sessionStorage.getItem("userId");
  this.yourRideDetails = {
    userId: this.userId,
    date:new Date().toJSON().split('T')[0]

  }
  
  this.rest.getRideHistory(this.yourRideDetails).subscribe(
    response => this.parse(response),
    err => console.log(err)

  );
}


parse(response) {
    
  if (response.status === 200) {
    this.profile=[];
    this.isValid = response.ridehistory ? true : false;
    if (this.isValid) {
      this.profile = response.ridehistory;

      console.log("hello", this.profile)
    }

  }
  console.log("hello", this.profile)

}


deleteRide(event){
 
  let userId = sessionStorage.getItem("userId");
  //this.profile=[];
  this.deleterideDetails = {
    userId: userId,
    date:event[0].date

  }
  this.rest.deleteRide(this.deleterideDetails).subscribe(
    response => {this.parse(response)},
    err => console.log(err)

  );
}
}
