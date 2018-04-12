import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Rest } from '../../providers/rest';
import { ShareridePage } from '../shareride/shareride';
import { car } from '../../assets/icon/car';
import { LoginPage } from '../login/login';


/**
 * Generated class for the YourridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-yourride',
  templateUrl: 'yourride.html',

})
export class YourridePage {

  data: any;
  isValid: boolean = false;
  ridesAvailable = [];
  profile: any = [];
  rideDetails: any = [];
  yourRideDetails = {
    userId: '',
    date: ''

  }
  deleterideDetails = {
    userId: '',
    date: '',
    time: ''
  }
  imageUrl: string = "";
  isViewRide: boolean = false;
  selectedRide: any;
  ridesInQueue: any;
  details: any;
  driverDetails: any;
  isPassenger: boolean = false;
  isDriver: boolean = false;
  uPaasengerList: any;
  uDriverList: any;
  userId: any;
  coPassenegerDetails:any;
  isViewRideInfo:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest, private events: Events) {

  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    console.log('ionViewDidLoad YourridePage');

    this.userId = sessionStorage.getItem("userId");
    this.yourRideDetails = {
      userId: this.userId,
      date: new Date().toJSON().split('T')[0]

    }
    if (!this.userId) {
      this.navCtrl.push(LoginPage);
      return;
    }
    this.getRideInfo();

    // this.events.subscribe('yourideInfo',(rideDetails) => {
    //   console.log("youride page......",rideDetails)
    //        this.rideDetails= rideDetails;
    //   });
    // this.parse(this.rideDetails);
  }

  

  getRideInfo(){
    this.rest.getYourRideDetails(this.yourRideDetails).subscribe(
      response => this.parse(response),
      err => console.log(err)

    );
  }
  parse(response) {

    if (response.status === 200) {
      let profiles = [];
      this.isValid = response.availableRides ? true : false;
      this.imageUrl = response.user ? response.user : "";
      if (this.isValid) {
        this.profile = response.availableRides ? response.availableRides : '';
      }
      console.log("this.userId;", this.userId)
      this.uDriverList = this.profile.map(function (profile) {
        return profile.filter(function (item) {
          return item.user_id === sessionStorage.getItem("userId");
        })
      })
      let list=[];
      this.uPaasengerList = this.profile.map(function (profile) {
        return profile.map(function (item) {
          if (item.confirmation) {
          return  item.confirmation.filter(function (subitem) {
              return subitem.ride_id === sessionStorage.getItem("userId");
            }).length > 0 ? item:list
          }
        })
      })

      console.log("uDriverList", this.uDriverList);
      console.log("upassengersList", this.uPaasengerList);

    }


  }

  updateRide(event) {
    console.log("inside update ride", event);
    this.navCtrl.push(ShareridePage);
  }

  deleteRide(event) {

    this.userId = sessionStorage.getItem("userId");
    //this.profile=[];
    this.deleterideDetails = {
      userId: this.userId,
      date: event[0].date,
      time: event[0].time

    }
    this.rest.deleteRide(this.deleterideDetails).subscribe(
      response => response ,
      err => console.log(err)

    );
    this.getRideInfo();
    
  }

  viewCopassengerDetails(item) {
    console.log("item", item);
    this.isViewRide = true;
    this.coPassenegerDetails = item;
    

  }

viewInfo(item){

  this.isViewRideInfo=true;
  this.isViewRide=true;
  this.details=item
}

}
