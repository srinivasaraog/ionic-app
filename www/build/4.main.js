webpackJsonp([4],{

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(353);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = (function () {
    function SignupPageModule() {
    }
    return SignupPageModule;
}());
SignupPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */])],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]]
    })
], SignupPageModule);

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { OfferRidePage } from '../offerride/offerride';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, rest, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rest = rest;
        this.formBuilder = formBuilder;
        this.userNotExists = false;
        this.isValid = false;
        this.authForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].maxLength(30)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(8)])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.onSubmit = function (value) {
        var _this = this;
        if (this.authForm.valid) {
            this.rest.getloginStatus(value).subscribe(function (response) { return _this.loginSucess(response); }, function (err) { return console.log(err); });
        }
    };
    LoginPage.prototype.loginSucess = function (response) {
        if (response.sucess) {
            var userId = response.userId;
            sessionStorage.setItem("userId", userId);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        }
        else if (response.message.indexOf("user doesnot exist") >= 0) {
            this.userNotExists = true;
            this.isValid = false;
        }
        else if (response.message.indexOf("Invalid password") >= 0) {
            this.isValid = true;
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding id="login">\n\n <form [formGroup]="authForm" (ngSubmit)="onSubmit(authForm.value)">\n\n        <ion-item [ngClass]="{\'error-border\':!authForm.controls.email.valid && authForm.controls.email.touched}">\n\n            <ion-label floating>E-Mail</ion-label>\n\n            <ion-icon name="email"></ion-icon>\n\n            <ion-input formControlName="email" type="text"></ion-input>\n\n        </ion-item>\n\n  \n\n\n\n          <p class="item-md" *ngIf="authForm.controls.email.hasError(\'required\') && authForm.controls.email.touched">\n\n              <span class="error">Email field is required!</span>\n\n          </p>\n\n          <p class="item-md" *ngIf="authForm.controls.email.hasError(\'pattern\') && authForm.controls.email.touched">\n\n              <span class="error">Enter a valid email address</span>\n\n          </p>\n\n\n\n        <ion-item [ngClass]="{\'error-border\':!authForm.controls.password.valid && authForm.controls.password.touched}">\n\n            <ion-label floating>Password</ion-label>\n\n            <ion-icon name="lock"></ion-icon>\n\n            <ion-input formControlName="password" type="password"></ion-input>\n\n        </ion-item>\n\n        <p class="item-md" *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">\n\n            <span class="error"> Sorry, field password is required!</span>\n\n        </p>\n\n        <p class="item-md" *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">\n\n            <span class="error">Sorry, minimum password length is 8!</span>\n\n        </p> \n\n        <p class="item-md" *ngIf="isValid && authForm.controls.password.touched">\n\n            <span class="error">Please enter a correct password</span>\n\n        </p> \n\n                     \n\n  \n\n        <button ion-button full color="primary" [disabled]="!authForm.valid" style="margin-top: 20px;" type="submit">SIGN IN</button>\n\n        <p *ngIf="userNotExists">\n\n            <span class="error">User not exists,please sign up !</span>\n\n        </p>    \n\n    </form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_rest__["a" /* Rest */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormBuilder */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, rest) {
        this.navCtrl = navCtrl;
        this.rest = rest;
        this.rootPage = 'TabsPage';
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    return HomePage;
}());
HomePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\home\home.html"*/'<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_rest__["a" /* Rest */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(325);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, rest) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rest = rest;
        this.userDetails = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            type: 'register'
        };
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signup = function (firstname, lastname, email, password, confirmpassword) {
        var _this = this;
        this.userDetails = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
            type: 'register'
        };
        this.rest.getSignUpStatus(this.userDetails).subscribe(function (response) { return _this.navigate(response); }, function (err) { return _this.err = err; });
    };
    SignupPage.prototype.navigate = function (res) {
        console.log(res);
        if (res.status === 200) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }
        else {
            console.log("error", res);
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\signup\signup.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Sign Up</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n\n\n<ion-content padding id="signup">\n\n\n\n   <ion-item >\n\n       <ion-input  type="text" value=""  [(ngModel)]="firstname" placeholder="Firstname"></ion-input>\n\n   </ion-item>\n\n   <ion-item>\n\n       <ion-input  type="text" value=""  [(ngModel)]="lastname" placeholder="Lastname"></ion-input>\n\n   </ion-item>\n\n     <ion-item>\n\n         <ion-input  type="email" value=""  [(ngModel)]="email"  placeholder="Email"></ion-input>\n\n     </ion-item>\n\n     <ion-item>\n\n\n\n         <ion-input  type="password"  value=""  [(ngModel)]="password"  placeholder="password"></ion-input>\n\n     </ion-item>\n\n     <ion-item>\n\n\n\n         <ion-input  type="password"  value=""  [(ngModel)]="confirmpassword"  placeholder="Confirmpassword"></ion-input>\n\n     </ion-item>\n\n     <ion-item>\n\n            <ion-label>Gender</ion-label>\n\n            <ion-select [(ngModel)]="gender">\n\n              <ion-option value="f" selected="true">Female</ion-option>\n\n              <ion-option value="m">Male</ion-option>\n\n            </ion-select>\n\n      </ion-item>\n\n     <button ion-button block  (click)="signup(firstname,lastname,email,password,confirmpassword)"  color="primary">Signup</button>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_rest__["a" /* Rest */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map