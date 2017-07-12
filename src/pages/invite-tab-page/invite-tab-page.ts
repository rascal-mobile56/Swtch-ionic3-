import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InviteFriendPage } from '../invite-friend/invite-friend'

@Component({
  selector: 'page-invite-tab',
  templateUrl: 'invite-tab-page.html'
})
export class InviteTabPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }

goInviteFPage(){
  console.log("Go InviteFriendPage");
  this.navCtrl.push(InviteFriendPage);
}
}
