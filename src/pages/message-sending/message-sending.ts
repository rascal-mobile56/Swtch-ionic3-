import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-message-sending',
  templateUrl: 'message-sending.html'
})
export class MessagesSendingPage {

  public name:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {
    this.name = navParams.get("name");
  }


}
