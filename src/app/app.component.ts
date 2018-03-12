import { Component,ViewChild,ElementRef,Renderer,OnInit} from '@angular/core';
import { App,Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Rest } from '../providers/rest';
import { LoginPage } from '../pages/login/login';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'WelcomePage';
  isrideHistoryAvailable:boolean=false;
  isNotificationAvailable:boolean=false;
  imageUrl:any;
  files:any=[];
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private app:App,private ElementRef:ElementRef,private renderer:Renderer,public rest:Rest) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  @ViewChild('myNav') nav: Nav 
  
  ngOnInit (){
    let userId=sessionStorage.getItem('userId');
    let profileDetails={
      userId:userId
    }
    this.rest.getProfileimage(profileDetails).subscribe(
      response => (this.parse(response)),
      err => console.log(err)

    );
  
  }
  parse(res){
     this.imageUrl=res.imageResponse?res.imageResponse:''
  }
rideHistory(){
  console.log("ride history")
  this.isrideHistoryAvailable=true;
  
}

notification(){
  this.isNotificationAvailable=true;
}

@ViewChild("input")
private nativeInputBtn: ElementRef;

public callback(event: Event): void {
  console.log("event call backs",event)

   // trigger click event of hidden input
   let clickEvent: MouseEvent = new MouseEvent("click", {bubbles: true});
   this.renderer.invokeElementMethod(
       this.nativeInputBtn.nativeElement, "dispatchEvent", [clickEvent]);
 }

public filesAdded(event: Event): void {
  let files: FileList = this.nativeInputBtn.nativeElement.files;
  //console.log("event call backs",files);
 
  var reader = new FileReader();

     reader.onload = (event:any) => {
       this.imageUrl = event.target.result;
       let userId=  sessionStorage.getItem("userId")
       let uploadPhotodetails={
        userId:userId,
        imageUrl:this.imageUrl,
        type:files[0].type,
        name:files[0].name

       }
       this.rest.profileUpdate(uploadPhotodetails).subscribe(
        response => (response),
        err => console.log(err)

      );

                            
      


     }
    console.log(files[0])
     reader.readAsDataURL(files[0]);
  
}
logout(){
  sessionStorage.clear();
  //this.nav.setRoot(LoginPage);
  this.app.getRootNav().setRoot(LoginPage);
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
