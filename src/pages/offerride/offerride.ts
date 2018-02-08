import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
@IonicPage()
@Component({
  selector: 'page-offerride',
  templateUrl: 'offerride.html',
})
export class OfferRidePage implements OnInit {
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 1;
    this.latitude = 13.082680;
    this.longitude = 80.270718;
    
    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          window.alert(place.geometry.location); // gets latitude and longitude here
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}