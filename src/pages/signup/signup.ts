import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Rest } from '../../providers/rest';
import { LoginPage }  from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupResponse: any;
  userNotVerified: boolean = false;
  userAlreadyExists: boolean = false;
  errorMessage: any;
  authForm: FormGroup;
  userDetails={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmpassword:'',
    type:'register'
  };
  err:string;
 // constructor(public navCtrl: NavController, public navParams: NavParams,public rest: Rest) {
 // }

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public rest: Rest, public formBuilder: FormBuilder) {
    this.authForm = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.minLength(8), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(value: any): void {
        this.userDetails={
          firstname:value.firstname,
          lastname: value.lastname,
          email: value.email,
          password: value.password,
          confirmpassword: value.confirmpassword,
          type:'register'
        };
        this.rest.getSignUpStatus(this.userDetails).subscribe(
         response => this.navigate(response),
         err=>      this.err=err

        );

      }

  navigate(res){
    console.log(res);
    if (res.status === 200) {
      this.navCtrl.push(LoginPage);
    } else if (res.error && (res.error.errorCode === 'userAlreadyExists' || res.error.errorCode === 'userNotVerified' || res.error.errorCode === 'validationErrors' ) ) {
      this.errorMessage = res.error.errorMessage;
    } else {
      this.errorMessage = "Something went wrong, please try again !"
      console.log("error",res);
    }
  }
}
