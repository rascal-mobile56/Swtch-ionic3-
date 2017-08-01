import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact-team',
  templateUrl: 'contact-team.html'
})
export class ContactTeamPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,

  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }
  backPage(){
    this.navCtrl.pop();
  }

}
