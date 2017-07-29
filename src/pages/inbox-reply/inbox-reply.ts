import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController, } from 'ionic-angular';

@Component({
  selector: 'page-inbox-reply',
  templateUrl: 'inbox-reply.html'
})
export class InboxReplyPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController

  ) {
  }


  replyMessage(){
      console.log("Sending");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
