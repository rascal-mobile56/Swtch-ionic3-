import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InviteFriendPage } from '../invite-friend/invite-friend'

@Component({
  selector: 'page-invite-tab',
  templateUrl: 'invite-tab-page.html'
})
export class InviteTabPage {

  person:any;
  constructor(
    public navCtrl: NavController,

  ) {
  }

  ionViewWillEnter(){
    this.person = JSON.parse(window.localStorage.getItem('profile'));
    console.log(this.person);
  }

goInviteFPage(){
  console.log("Go InviteFriendPage");
  this.navCtrl.push(InviteFriendPage);
}
}
