import { Component,NgZone, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController,NavParams } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import { Rest } from '../../providers/rest';
import { } from '@types/googlemaps';

declare var google;
@IonicPage()
@Component({
  selector: 'page-findride',
  templateUrl: 'findride.html',
})
export class FindridePage {

  map: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public address: any;
  from: any;
  to: any;
  ridesAvailable:boolean=false;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,public rest: Rest) {


  }

  @ViewChild('map') mapElement: ElementRef;
  
  ngOnInit() {

    //set google maps defaults
    this.zoom = 1;
    this.latitude = 13.082680;
    this.longitude = 80.270718;
    this.address = "";
    this.from = {};
    this.to = {};


    //create search FormControl
    this.searchControl = new FormControl();


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
  


  findRide(){
    console.log(".....findRide",this.from);
    if(this.from.address && this.to.address){
      this.ridesAvailable=true;
      console.log(".....ridesAvailable",this.ridesAvailable);
    }
  }
  

}
