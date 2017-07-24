import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactTeamPage } from '../contact-team/contact-team'

@Component({
  selector: 'page-contact-tab',
  templateUrl: 'contact-tab-page.html'
})
export class ContactTabPage {

  person:any;
  constructor(
    public navCtrl: NavController,

  ) {

  }

  ionViewWillEnter(){
    this.person = JSON.parse(window.localStorage.getItem('profile'));
    console.log(this.person);
  }

  goContactTeamPage(){
    console.log("go ConactTeamPage");
    this.navCtrl.push(ContactTeamPage);
  }
}
