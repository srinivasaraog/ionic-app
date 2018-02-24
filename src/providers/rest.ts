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
  private findRideUrl = 'http://localhost:3000/api/findRide';
  private getYourRideDetailsUrl = 'http://localhost:3000/api/yourride';
  private updateRideDetailsUrl = 'http://localhost:3000/api/updateyourride';





  constructor(public http: Http) { }
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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = rideDetails;
    return this.http.post(this.findRideUrl, body)
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
