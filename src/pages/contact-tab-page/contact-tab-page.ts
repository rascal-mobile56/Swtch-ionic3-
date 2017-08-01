import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactTeamPage } from '../contact-team/contact-team';

@Component({
  selector: 'page-contact-tab',
  templateUrl: 'contact-tab-page.html'
})
export class ContactTabPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,
  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  goContactTeamPage(){
    console.log("go ConactTeamPage");
    this.navCtrl.push(ContactTeamPage);
  }
}
