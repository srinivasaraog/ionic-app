import { Component, NgZone, OnInit,ViewChild } from '@angular/core';
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
  date: string;
  maxDate: string;

  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  @ViewChild('datePicker') datePicker;
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
      let autocompleteFrom = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementsByClassName("searchbar-input")[0], {
        types: ["geocode"]
      });
      let autocompleteDestination = new google.maps.places.Autocomplete(<HTMLInputElement>document.querySelector('.destinationAddress .searchbar-input'), {
        types: ["geocode"]
      });
      console.log(".....maps");
      autocompleteFrom.addListener("place_changed", () => {
        ngZone(autocompleteFrom);
      });
      
      autocompleteDestination.addListener("place_changed", () => {
        ngZone(autocompleteDestination);
      });

      const ngZone=(autoComplete)=>{
        this.ngZone.run(() => {
          console.log("place_changed");
          //get the place result
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();
  
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
      }


    });
  }
  
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      console.log("geolocation");
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }



  
     open() {
         if (!this.date) {
             this.date = new Date().toJSON().split('T')[0];
             setTimeout(() => {
                 this.datePicker.open();
             }, 50)
         } else {
             this.datePicker.open();
         }

     }

}