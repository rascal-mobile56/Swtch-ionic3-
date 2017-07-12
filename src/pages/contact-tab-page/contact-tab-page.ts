import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactTeamPage } from '../contact-team/contact-team'

@Component({
  selector: 'page-contact-tab',
  templateUrl: 'contact-tab-page.html'
})
export class ContactTabPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }

  goContactTeamPage(){
    console.log("go ConactTeamPage");
    this.navCtrl.push(ContactTeamPage);
  }
}
