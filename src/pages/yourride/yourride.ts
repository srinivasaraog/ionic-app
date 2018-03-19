import { Component, OnInit } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
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
  rideDetails:any=[];
  yourRideDetails={
    userId:'',
    date:''
   
  }
  deleterideDetails={
    userId:'',
    date:'',
    time:''
  }
  imageUrl:string="";
  isViewRide:boolean=false;
  selectedRide:any;
  ridesInQueue:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest,private events: Events) {
  
  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    console.log('ionViewDidLoad YourridePage');
    
    let userId = sessionStorage.getItem("userId");
    this.yourRideDetails = {
      userId: userId,
      date:new Date().toJSON().split('T')[0]

    }
    if(!userId){
      this.navCtrl.push(LoginPage);
      return;
    }
    this.rest.getYourRideDetails(this.yourRideDetails).subscribe(
      response => this.parse(response),
      err => console.log(err)

    );
   
    // this.events.subscribe('yourideInfo',(rideDetails) => {
    //   console.log("youride page......",rideDetails)
    //        this.rideDetails= rideDetails;
    //   });
      // this.parse(this.rideDetails);
  }
  parse(response) {
    
    if (response.status === 200) {
      this.profile=[];
      this.isValid = response.availableRides ? true : false;
      this.imageUrl=response.user?response.user:"";
      if (this.isValid) {
        this.data = response.availableRides;

        for (let i = 0; i < this.data.length; i++) {
          this.profile.push(this.data[i].profile);

        }
        console.log("hello", this.profile)
      }

    }


  }

  updateRide(event){
   console.log("inside update ride",event);
   this.navCtrl.push(ShareridePage);
  }

  deleteRide(event){
   
    let userId = sessionStorage.getItem("userId");
    //this.profile=[];
    this.deleterideDetails = {
      userId: userId,
      date:event[0].date,
      time:event[0].time

    }
    this.rest.deleteRide(this.deleterideDetails).subscribe(
      response => {this.parse(response)},
      err => console.log(err)

    );
  }

  viewRideDetails(item){
    console.log("item",item);
    this.isViewRide=true;
    this.selectedRide=item;
    if(item.confirmation.length>0){
      this.ridesInQueue=item.confirmation[0].ridesInQueue;    
    }  console.log(this.selectedRide);
    
  }




}
