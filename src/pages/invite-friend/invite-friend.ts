import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-invite-friend',
  templateUrl: 'invite-friend.html'
})
export class InviteFriendPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }
  backPage(){
    this.navCtrl.pop();
  }

}
