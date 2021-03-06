import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
  Generated class for the Rest provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Rest {

  private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private loginUrl = 'http://localhost:3000/api/login';
  private signupUrl = 'http://localhost:3000/api/signup';
  private offerRideUrl = 'http://localhost:3000/api/offerRide';
  private findRideUrl = 'http://localhost:3000/api/findride';
  private getYourRideDetailsUrl = 'http://localhost:3000/api/yourride';
  private updateRideDetailsUrl = 'http://localhost:3000/api/updateyourride';
  private deleteRideDetails = 'http://localhost:3000/api/deleteRide' 
  private ridehistory = 'http://localhost:3000/api/ridehistory';
  private confirmRideUrl = 'http://localhost:3000/api/confirmride'
  private notificationsUrl = 'http://localhost:3000/api/notifications'
  private profileUpdateUrl='http://localhost:3000/api/profileUpdate'
  private profileImage='http://localhost:3000/api/profileImage'
  private paytm='http://localhost:3000/api/paytmtest'

  constructor(public http: Http) { }

  paymentmethodCreate(): Observable<string[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      ORDER_ID :'vidisha123',
      CUSTID : 'CUST001',
      txnAmount :'1'

    }
      
 
    
    return this.http.post(this.paytm, body)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getProfileimage(userId): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = userId;
 
    
    return this.http.post(this.profileImage, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  profileUpdate(profileDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    let body = profileDetails;
    let options = new RequestOptions({ headers: headers,body:body });
    return this.http.post(this.profileUpdateUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  getNotifications(yourRideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = yourRideDetails;

    return this.http.post(this.notificationsUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  confirmRide(yourRideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = yourRideDetails;

    return this.http.post(this.confirmRideUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRideHistory(yourRideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = yourRideDetails;

    return this.http.post(this.ridehistory, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteRide(yourRideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = yourRideDetails;

    let options = new RequestOptions({ headers: headers,body:body });
    
    return this.http.delete(this.deleteRideDetails, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateRide(yourRideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = yourRideDetails;

    return this.http.post(this.updateRideDetailsUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getYourRideDetails(yourRideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = yourRideDetails;

    return this.http.post(this.getYourRideDetailsUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }

  findRide(rideDetails): Observable<string[]> {
   // let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = rideDetails;
    console.log("req params",rideDetails)
    //let options = new RequestOptions({ headers: headers,body:body });
    return this.http.post(this.findRideUrl,body )
      .map(this.extractData)
      .catch(this.handleError);
  }


  offerRide(rideDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = rideDetails;
    return this.http.post(this.offerRideUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getSignUpStatus(userDetails): Observable<string[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = userDetails;
    return this.http.post(this.signupUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getloginStatus(userDetails): Observable<string[]> {
    let body = userDetails;
    return this.http.post(this.loginUrl, body)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
