import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { Rest } from '../../providers/rest';

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
  yourRideDetails: any = {
    userId: ""

  };
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YourridePage');
    let userId = sessionStorage.getItem("userId");
    this.yourRideDetails = {
      userId: userId

    }
    this.rest.getYourRideDetails(this.yourRideDetails).subscribe(
      response => this.data = response,
      err => console.log(err)

    );
  }

}
