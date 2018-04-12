import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import { Rest } from '../../providers/rest';

/**
 * Generated class for the NavbarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-navbar',
  templateUrl: 'navbar.html',
})
export class NavbarPage {
  notificationReq:any;
  confirmation:any;
  badges:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: Rest,public events:Event) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavbarPage');
  }

  ngOnInit(){
    let userId=sessionStorage.userId;
    this.notificationReq={
      userId:userId
     }
      this.rest.getNotifications(this.notificationReq).subscribe(
      response => this.navigator(response),
      err => console.log(err)
  
     );
  }

  navigator(response){
    console.log("......",response);
     this.confirmation=response.confirmation ? response.confirmation:"";
     if(this.confirmation && this.confirmation!=="undefined"){
      console.log("......",this.confirmation);
        this.badges = this.confirmation.filter(function(item){
         
           return  item.unread === '1'
         });
     }
     
     
  }

}
