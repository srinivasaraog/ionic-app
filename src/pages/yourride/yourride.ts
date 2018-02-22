import { Component,OnInit } from '@angular/core';
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
  data:any;
  isValid:boolean=false;
  ridesAvailable=[];
  profile:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest) {
  }

  ionViewDidLoad() {
   
  }
  ngOnInit(){
    console.log('ionViewDidLoad YourridePage');
    let userId = sessionStorage.getItem("userId");
    this.yourRideDetails = {
      userId: userId

    }
    this.rest.getYourRideDetails(this.yourRideDetails).subscribe(
      response => this.parse(response),
      err => console.log(err)

    );
  }
  parse(response){
    if(response.status===200){
      this.isValid=response.offerride? true:false;
     if(this.isValid){
      this.data=response.offerride;
      
     for(let i=0;i < this.data.length;i++){
      
           this.profile.push(this.data[i].profile);
          //  for(let j=0; j < this.profile.length;j++){
          //    this.ridesAvailable=this.profile[j];
          //  }
     }   
      console.log("hello", this.profile)
     } 
    
    }
     
    
  }




}
