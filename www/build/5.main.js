webpackJsonp([5],{

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(402);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */])],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]]
    })
], SignupPageModule);

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(14);
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
    // constructor(public navCtrl: NavController, public navParams: NavParams,public rest: Rest) {
    // }
    function SignupPage(navCtrl, navParams, events, rest, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.rest = rest;
        this.formBuilder = formBuilder;
        this.userNotVerified = false;
        this.userAlreadyExists = false;
        this.userDetails = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            type: 'register'
        };
        this.authForm = formBuilder.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(4)])],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(1)])],
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].maxLength(30)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(8)])],
            confirmpassword: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(8)])]
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signup = function (value) {
        var _this = this;
        this.userDetails = {
            firstname: value.firstname,
            lastname: value.lastname,
            email: value.email,
            password: value.password,
            confirmpassword: value.confirmpassword,
            type: 'register'
        };
        this.rest.getSignUpStatus(this.userDetails).subscribe(function (response) { return _this.navigate(response); }, function (err) { return _this.err = err; });
    };
    SignupPage.prototype.navigate = function (res) {
        console.log(res);
        if (res.status === 200) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
        }
        else if (res.error && (res.error.errorCode === 'userAlreadyExists' || res.error.errorCode === 'userNotVerified' || res.error.errorCode === 'validationErrors')) {
            this.errorMessage = res.error.errorMessage;
        }
        else {
            this.errorMessage = "Something went wrong, please try again !";
            console.log("error", res);
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\signup\signup.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Sign Up</ion-title>\n\n  </ion-navbar>\n\n  \n\n</ion-header>\n\n\n\n\n\n<ion-content padding id="signup">\n\n  <form [formGroup]="authForm" (ngSubmit)="signup(authForm.value)">\n\n\n\n    <ion-item [ngClass]="{\'error-border\':!authForm.controls.firstname.valid && authForm.controls.firstname.touched}">\n\n      <ion-input formControlName="firstname" type="text" value="" placeholder="Firstname"></ion-input>\n\n    </ion-item>\n\n    <p class="item-md" *ngIf="authForm.controls.firstname.hasError(\'required\') && authForm.controls.firstname.touched">\n\n      <span class="error"> Sorry, field firstname is required!</span>\n\n    </p>\n\n    <p class="item-md" *ngIf="authForm.controls.firstname.hasError(\'minlength\') && authForm.controls.firstname.touched">\n\n      <span class="error">Sorry, minimum firstname length is 4!</span>\n\n    </p>\n\n\n\n\n\n    <ion-item [ngClass]="{\'error-border\':!authForm.controls.lastname.valid && authForm.controls.lastname.touched}">\n\n      <ion-input formControlName="lastname" type="text" value="" placeholder="Lastname"></ion-input>\n\n    </ion-item>\n\n    <p class="item-md" *ngIf="authForm.controls.lastname.hasError(\'required\') && authForm.controls.lastname.touched">\n\n      <span class="error"> Sorry, field lastname is required!</span>\n\n    </p>\n\n    <p class="item-md" *ngIf="authForm.controls.lastname.hasError(\'minlength\') && authForm.controls.lastname.touched">\n\n      <span class="error">Sorry, minimum lastname length is 1!</span>\n\n    </p>\n\n\n\n    <ion-item [ngClass]="{\'error-border\':!authForm.controls.email.valid && authForm.controls.email.touched}">\n\n      <ion-input formControlName="email" type="email" value="" placeholder="Email"></ion-input>\n\n    </ion-item>\n\n    <p class="item-md" *ngIf="authForm.controls.email.hasError(\'required\') && authForm.controls.email.touched">\n\n      <span class="error">Email field is required!</span>\n\n    </p>\n\n    <p class="item-md" *ngIf="authForm.controls.email.hasError(\'pattern\') && authForm.controls.email.touched">\n\n      <span class="error">Enter a valid email address</span>\n\n    </p>\n\n\n\n    <ion-item [ngClass]="{\'error-border\':!authForm.controls.password.valid && authForm.controls.password.touched}">\n\n      <ion-input formControlName="password" type="password" value="" placeholder="password"></ion-input>\n\n    </ion-item>\n\n    <p class="item-md" *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">\n\n      <span class="error"> Sorry, field password is required!</span>\n\n    </p>\n\n    <p class="item-md" *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">\n\n      <span class="error">Sorry, minimum password length is 8!</span>\n\n    </p>\n\n\n\n    <ion-item [ngClass]="{\'error-border\':!authForm.controls.confirmpassword.valid && authForm.controls.confirmpassword.touched}">\n\n      <ion-input formControlName="confirmpassword" type="password" value="" placeholder="Confirmpassword"></ion-input>\n\n    </ion-item>\n\n    <p class="item-md" *ngIf="authForm.controls.confirmpassword.hasError(\'required\') && authForm.controls.confirmpassword.touched">\n\n      <span class="error"> Sorry, field confirmpassword is required!</span>\n\n    </p>\n\n    <p class="item-md" *ngIf="authForm.controls.confirmpassword.hasError(\'minlength\') && authForm.controls.confirmpassword.touched">\n\n      <span class="error">Sorry, minimum confirmpassword length is 8!</span>\n\n    </p>\n\n\n\n    <ion-item>\n\n      <ion-label>Gender</ion-label>\n\n      <ion-select>\n\n        <ion-option value="f" selected="true">Female</ion-option>\n\n        <ion-option value="m">Male</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <p class="item-ios">\n\n      <span class="error">{{errorMessage}}</span>\n\n    </p>\n\n    <button ion-button full color="primary" [disabled]="!authForm.valid" style="margin-top: 20px;" type="submit">Signup</button>\n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Admin\Documents\Project-1\ionic-app\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_rest__["a" /* Rest */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* FormBuilder */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map