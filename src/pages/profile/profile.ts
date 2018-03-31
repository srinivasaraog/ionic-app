import { IonicPage, NavController, NavParams,} from 'ionic-angular';
import {Component,  Input, Inject, ViewChild, Output,EventEmitter} from "@angular/core";
import { Renderer,ElementRef} from '@angular/core';



/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private renderer:Renderer,private elementRef :ElementRef) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }


   /**
   * The callback executed when button pressed, set by parent
   */
  @Input()
  private btnStyle: String;

  /**
   * The callback executed when files are selected, set by parent
   */
  @Input()
  private btnCallback: Function;


  @Output() ribbonClicked = new EventEmitter<any>();

  /**
   * Native upload button (hidden)
   */
  @ViewChild("input")
  private nativeInputBtn: ElementRef;

  /**
   * Constructor
   * @param  {Renderer} renderer for invoking native methods
   * @param  {Log}      logger instance
   */


  /**
   * Callback executed when the visible button is pressed
   * @param  {Event}  event should be a mouse click event
   */
  public callback(event: Event): void {
   console.log("event call backs",event)

    // trigger click event of hidden input
    let clickEvent: MouseEvent = new MouseEvent("click", {bubbles: true});
    this.renderer.invokeElementMethod(
        this.nativeInputBtn.nativeElement, "dispatchEvent", [clickEvent]);
  }

  /**
   * Callback which is executed after files from native popup are selected.
   * @param  {Event}    event change event containing selected files
   */
  public filesAdded(event: Event): void {
    let files: FileList = this.nativeInputBtn.nativeElement.files;
    console.log("event call backs",files);
    //this.btnCallback(files);
    this.ribbonClicked.emit(files);
  }

}


