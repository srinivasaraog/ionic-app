import { Component, NgZone, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, Events, App } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import { Rest } from '../../providers/rest';
import { } from '@types/googlemaps';
import { LoginPage } from '../login/login';
import { YourridePage } from '../yourride/yourride';
import { Socket } from 'ng-socket-io';

declare var google;
@IonicPage()
@Component({
  selector: 'page-findride',
  templateUrl: 'findride.html',
})
export class FindridePage {

  maps: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number; 
  public address: any;
  findfrom: any;
  findto: any;
  from: any;
  to: any;
  ridesAvailable: boolean = false;
  distance:any='';
  rideDetails:any={};
  profile:any=[]
  
  selectedDate:any='';
  isRideAvailable:boolean=false;
  minDate:any;
  isValid:boolean=false;
  data:any=[];
  isRideSelected:boolean=false;
  selectedRide:any={};
  seatsRequired:any="";
  courierWeight:any="";
  isRideConfirmed:boolean=false;
  costPerRide:number=0;
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public rest: Rest,public alertCtrl: AlertController,public navCtrl:NavController,private socket: Socket) {


  }

  @ViewChild('maps') mapElement: ElementRef;

  ngOnInit() {

    //set google maps defaults
    this.zoom = 1;
    this.latitude = 13.082680;
    this.longitude = 80.270718;
    this.address = "";
    this.from = {};
    this.to = {};
    this.findfrom = '';
    this.findto = '';



    //create search FormControl
    this.searchControl = new FormControl();

    this.minDate = new Date().toJSON().split('T')[0];
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocompleteFrom = new google.maps.places.Autocomplete(<HTMLInputElement>document.querySelector('.from .searchbar-input'), {
        types: ["geocode"]
      });
      let autocompleteDestination = new google.maps.places.Autocomplete(<HTMLInputElement>document.querySelector('.toAddress .searchbar-input'), {
        types: ["geocode"]
      });
      console.log(".....maps");
      autocompleteFrom.addListener("place_changed", () => {
        ngZone(autocompleteFrom);
        this.from.latitude = this.latitude;
        this.from.longitude = this.longitude;
        this.from.address = this.address;
        console.log(this.from.address);
        this.calculateAndDisplayRoute();
      });

      autocompleteDestination.addListener("place_changed", () => {
        ngZone(autocompleteDestination);
        this.to.latitude = this.latitude;
        this.to.longitude = this.longitude;
        this.to.address = this.address;
        console.log(this.to.address);
        this.calculateAndDisplayRoute();

      });

      let ngZone = (autoComplete) => {
        this.ngZone.run(() => {
          console.log("place_changed");
          //get the place result
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();

          //verify result
          // window.alert(place.geometry.location); // gets latitude and longitude here
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.address = place.formatted_address;
          return this;
        });
      }


    });
  }






  private setCurrentPosition() {
    console.log("in current position")
    if ("geolocation" in navigator) {
      console.log("geolocation", navigator);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("current", position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 20;
      });
    }
  }

  calculateDistance(l1,l2) {

    var p1 = new google.maps.LatLng(l1.latitude, l1.longitude);
    var p2 = new google.maps.LatLng(l2.latitude, l2.longitude);

     
      this.distance= (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    
  }

  calculateAndDisplayRoute() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer();
    console.log(".............", directionsService)
    console.log(".............", this.from.address)
    console.log(".............", this.to.address)
    this.maps = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.setCurrentPosition()
    directionsDisplay.setMap(this.maps);
    this.calculateDistance(this.from,this.to);
    directionsService.route({
      origin: this.from.address,
      destination: this.to.address,
      travelMode: 'DRIVING'
    }, (response, status) => {
      console.log("....rsesponse", response)
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  prompt() {

    let alert = this.alertCtrl.create({
      title: 'Change Address',
      message: 'No rides Available for this address',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            //this.isRideAvailable = false;
          }
        },
        {
          text: 'Update',
          handler: () => {
            console.log('update address clicked');
          


          }
        }
      ]
    });
    alert.present();

  }

  navigator(res) {
    
    if (res.status === 200 && res.findride) {
      console.log("inside navigator")
      this.isRideAvailable=true;
      this.profile=[];
      
      this.isValid = res.findride ? true : false;
      if (this.isValid) {
        this.data = res.findride;

        for (let i = 0; i < this.data.length; i++) {
         // this.data[i].profile[0].photo.data=  "data:" +  this.data[i].profile[0].photo.contentType + ";base64," + new Buffer( this.data[i].profile[0].photo.data).toString('base64');
                       

          this.profile.push(this.data[i].profile);

        }
        console.log("hello", this.profile)
      }
    }else if(res.status===200 && res.message){
      this.isRideAvailable=false;
      this.prompt();

    }else if(res.status===409){
     
    }

  }

  findRide() {
    console.log("inside find ride function")
    let availableRides: any = [];
    
    if(!sessionStorage.getItem("userId")){
      this.navCtrl.push(LoginPage);
      return;
    }
    if (this.from.address && this.to.address) {
      console.log("rest call.....")
      
      this.rideDetails.from = this.from;
      this.rideDetails.to = this.to;
      this.rideDetails.date = this.selectedDate;
      this.rideDetails.distance=this.distance;
      this.rideDetails.courierWeight=this.courierWeight;
      this.rideDetails.seatsRequired=this.seatsRequired;
    
      this.rest.findRide(this.rideDetails).subscribe(
        response => this.navigator(response),
        err => console.log(err)

      );
    }
  }


  rideSelcted(event){
    console.log(event)
    this.isRideSelected=event? true:false;
    if(this.isRideSelected){
       this.selectedRide= event
    }
    if(this.seatsRequired==="1"){
      this.costPerRide=(this.distance*2*this.seatsRequired)
    }else if(this.seatsRequired==="2"){
      this.costPerRide=(this.distance*2*this.seatsRequired-50);
    }else if(this.seatsRequired >"2"){
      this.costPerRide=(this.distance*2*this.seatsRequired-100);
    }
    
    if(this.courierWeight !=="" && this.courierWeight<='10'){
      this.costPerRide =this.distance/2
    }else if(this.courierWeight !=="" && this.courierWeight <= '50' ){
      this.costPerRide =this.distance/1.5
    }
  }

 
  confirmRide(selectedRide){
   console.log(this.rideDetails);
  
   this.rideDetails.costPerRide= this.costPerRide;
   this.rideDetails.user_id=this.selectedRide.user_id;
   this.rideDetails.userId=sessionStorage.getItem("userId");
   this.rideDetails.seatsAvailable=selectedRide.seatsAvailable;
   

   this.socket.emit('create notification',this.rideDetails);

   this.rest.confirmRide(this.rideDetails).subscribe(
    response => this.confirmResponse(response),
    err => console.log(err)

  );
  
  
  }
  confirmResponse(res){
    
    if(res.status===200 && res.offerride.nModified===1){
      this.presentAlert()
     
    }
   
    
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Ride Confirmation Sent to Driver',
      subTitle: 'Once Driver accepted will notify you',
      buttons: [
        
        {
          text: 'OK',
          handler: () => {
            console.log('OK  clicked');
            this.navCtrl.push(YourridePage);
 
          }
        }
      ]
    });
    alert.present();
  }
}
