import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
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
  userNotVerified: boolean = false;
  userLoginError: boolean = false;
  isValid:boolean=false;
  confirmation:any;
  badge:any;
  notificationReq:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events, public rest: Rest, public formBuilder: FormBuilder) {
        this.authForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.minLength(8), Validators.maxLength(30)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }

ngOnInIt(){
  
}
    
  
  onSubmit(value: any): void {
        if(this.authForm.valid) {
           this.rest.getloginStatus(value).subscribe(
            response => this.loginSucess(response),
            err => console.log(err)
          );
        }
    }
   navigator(response){
      console.log("......",response);
       this.confirmation=response.confirmation ? response.confirmation:"";
       if(this.confirmation && this.confirmation!=="undefined"){
        console.log("......",this.confirmation);
          this.badge = this.confirmation.filter(function(item){
           
             return  item.unread === '1'
           });
       }
       console.log(this.badge);
       if(this.badge){
        this.events.publish('badges',this.badge.length);
       }
       
    }
    
  loginSucess(response) {
    if (response.sucess) {
      let userId = response.userId;
      sessionStorage.setItem("userId",userId)
      this.notificationReq={
      userId:userId
      }
      this.rest.getNotifications(this.notificationReq).subscribe(
      response => this.navigator(response),
      err => console.log(err)
  
     );
     this.events.publish('loadProfile'); 
      this.navCtrl.push(HomePage);
    } else if (response.message.indexOf("user doesnot exist") >= 0) {
      this.userNotExists = true;
      this.isValid = false;
    } else if (response.message.indexOf("user is not verified") >= 0) {
      this.userNotVerified = true;
      this.isValid = false;
    } else if (response.message.indexOf("Invalid password") >= 0) {
      this.isValid = true;
    } else {
      this.userLoginError = true;
      this.isValid = false;
    }
  }


}
