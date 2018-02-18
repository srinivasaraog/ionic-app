import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import { Rest } from '../../providers/rest';
import { } from '@types/googlemaps';
import { YourridePage } from '../yourride/yourride';


declare var google;

/**
 * Generated class for the ShareridePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shareride',
  templateUrl: 'shareride.html',
})
export class ShareridePage {
  rideDetails: any;
  map: any;
  Destination: any;
  fromAddress: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public address: any;
  from: any;
  to: any;
  selectedDate: any;
  selectedTime:any;
  minDate: any;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public rest: Rest, public navCtrl: NavController, public navParams: NavParams) {


  }
  ionViewDidLoad() {
    
    
    console.log("share ride");

  }

  @ViewChild('map') mapElement: ElementRef;
  destination() {
    console.log("Destinatop", this.Destination)
  }

  fromaddress() {
    console.log("Destinatop", this.fromAddress)
  }
  ngOnInit() {

    //set google maps defaults
    this.zoom = 1;
    this.latitude = 13.082680;
    this.longitude = 80.270718;
    this.address = "";
    this.from = {};
    this.to = {};
    this.rideDetails = {};
    this.fromAddress = "";
    this.Destination = '';
    this.minDate='';
    this.selectedTime='';
    this.selectedDate='';



    //create search FormControl
    this.searchControl = new FormControl();
    
    this.minDate = new Date().toJSON().split('T')[0];
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocompleteFrom = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementsByClassName("searchbar-input")[0], {
        types: ["geocode"]
      });
      let autocompleteDestination = new google.maps.places.Autocomplete(<HTMLInputElement>document.querySelector('.destinationaddress .searchbar-input'), {
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
        this.zoom = 12;
      });
    }
  }


  calculateAndDisplayRoute() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer();
    console.log(".............", directionsService)
    console.log(".............", this.from.address)
    console.log(".............", this.to.address)
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.setCurrentPosition()
    directionsDisplay.setMap(this.map);
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


  offerRide() {
    if (this.from.address && this.to.address) {
      this.rideDetails.id = sessionStorage.getItem("userId");
      this.rideDetails.from = this.from;
      this.rideDetails.to = this.to;
      this.rideDetails.date=this.selectedDate;
      this.rideDetails.time=this.selectedTime;

      this.rest.offerRide(this.rideDetails).subscribe(
        response => this.navigator(response),
        err => console.log(err)

      );
    }
  }

  navigator(res) {

    if (res.status === 200)
      this.navCtrl.push(YourridePage);
  }
}
