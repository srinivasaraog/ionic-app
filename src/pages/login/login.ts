import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rest } from '../../providers/rest';
//import { OfferRidePage } from '../offerride/offerride';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userDetails = {
    email: '',
    password: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }
  login(email, pwd) {

    this.userDetails.email = email;
    this.userDetails.password = pwd;
    this.rest.getloginStatus(this.userDetails).subscribe(
      response => this.loginSucess(response),
      err => console.log(err)
    );

    
  }
  loginSucess(response) {
    if (response.sucess) {
      let userId = response.userId;
      sessionStorage.setItem("userId", userId);
      this.navCtrl.push(HomePage);
    } else {
      console.log(response);
    }
  }


}
