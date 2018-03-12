webpackJsonp([4],{

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(354);
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

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(326);
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