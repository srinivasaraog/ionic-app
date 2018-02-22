import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Rest } from '../../providers/rest';
//import { OfferRidePage } from '../offerride/offerride';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  authForm: FormGroup;
  userNotExists: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest, public formBuilder: FormBuilder) {
        this.authForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.minLength(8), Validators.maxLength(30)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }


  onSubmit(value: any): void {
        if(this.authForm.valid) {
           this.rest.getloginStatus(value).subscribe(
            response => this.loginSucess(response),
            err => console.log(err)
          );
        }
    }

  loginSucess(response) {
    if (response.sucess) {
      let userId = response.userId;
      sessionStorage.setItem("userId", userId);
      this.navCtrl.push(HomePage);
    } else if (response.message.indexOf("user doesnot exist") >= 0){
      this.userNotExists = true;
    }else {
      console.log(response);
    }
  }


}
