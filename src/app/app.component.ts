import { Component, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';
import { App, Platform, Nav, Events,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Rest } from '../providers/rest';
import { LoginPage } from '../pages/login/login';
import { Socket } from 'ng-socket-io';
import {NavbarPage} from '../pages/navbar/navbar'




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'WelcomePage';
  isrideHistoryAvailable: boolean = false;
  isNotificationAvailable: boolean = false;
  imageUrl: any;
  files: any = [];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private toastCtrl: ToastController,private socket: Socket, public events: Events, private app: App, private ElementRef: ElementRef, private renderer: Renderer, public rest: Rest) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    socket.on(sessionStorage.getItem('userId'), function(data){
      // this.events.publish('badges',data.unread);
      console.log("check notification client....",data) ;
     // this.presentToast();
     let toast = toastCtrl.create({
      message: "You got a request from the"+data.firstname+" Accept or reject",
      duration: 30000,
      cssClass: 'primary',
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
   });
   socket.on('disconnect', function () {
    console.log('user disconnected');
   });
  }
  @ViewChild('myNav') nav: Nav
 

  ngOnInit() {
    if (sessionStorage.getItem('userId') !== "") {
     
      this.loadProfile();
    
    }
   
    this.events.subscribe('loadProfile', () => {
      console.log("loadprofile",sessionStorage.getItem('userId'))
      if(sessionStorage.getItem('userId') !== ""){
        this.loadProfile();
      }
      
      

    });

  
  }

  loadProfile() {
    let userId = sessionStorage.getItem('userId');
    let profileDetails = {
      userId: userId
    }
    console.log("hiiii loadprofile",userId);
    this.rest.getProfileimage(profileDetails).subscribe(
      response => (this.parse(response)),
      err => console.log(err)

    );
  }
  parse(res) {
    this.imageUrl = res.imageResponse ? res.imageResponse : '';
  }

  rideHistory() {
 
    this.isrideHistoryAvailable = true;
    this.isNotificationAvailable = false;

  }

  notification() {
    this.isNotificationAvailable = true;
    this.isrideHistoryAvailable = false;
  }

  @ViewChild("input")
  private nativeInputBtn: ElementRef;

  public callback(event: Event): void {
    console.log("event call backs", event)

    // trigger click event of hidden input
    let clickEvent: MouseEvent = new MouseEvent("click", { bubbles: true });
    this.renderer.invokeElementMethod(
      this.nativeInputBtn.nativeElement, "dispatchEvent", [clickEvent]);
  }

  public filesAdded(event: Event): void {
    let files: FileList = this.nativeInputBtn.nativeElement.files;
    //console.log("event call backs",files);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      let userId = sessionStorage.getItem("userId")
      let uploadPhotodetails = {
        userId: userId,
        imageUrl: this.imageUrl,
        type: files[0].type,
        name: files[0].name

      }
      this.rest.profileUpdate(uploadPhotodetails).subscribe(
        response => (response),
        err => console.log(err)

      );





    }
    console.log(files[0])
    reader.readAsDataURL(files[0]);

  }
  logout() {
    sessionStorage.clear();
    //this.nav.setRoot(LoginPage);
    this.app.getRootNav().setRoot(LoginPage);
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  //  ribbonClicked(event){
  //   console.log("ribbonClicked",event);
  //   this.files=event;
  //   console.log("ribbonClicked",this.files);
  //   if(this.files.length>0){
  //     //  this.imageUrl=this.files[0].name;
  //      var reader = new FileReader();

  //      reader.onload = (event:any) => {
  //        this.imageUrl = event.target.result;
  //      }

  //      reader.readAsDataURL(event[0]);
  //      console.log("ribbonClicked",this.imageUrl); 
  //   }

  //  }
}
