import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutListPage } from '../about-list/about-list';

@Component({
  selector: 'page-about-tab',
  templateUrl: 'about-tab-page.html'
})
export class AboutTabPage {
pages: Array<{title: string, url: any, icon: any}>;
  constructor(
    public navCtrl: NavController,
  ) {
    this.pages = [
      { title: 'About', url: 'assets/About.html', icon: 'ios-information-circle-outline'},
      { title: 'How it works', url: 'assets/HowItWorks.html', icon: 'ios-paper-outline'},
      { title: 'Privicy', url: 'assets/Privacy.html', icon: 'ios-lock-outline' },
      { title: 'Terms of Use', url: 'assets/TermsOfUse.html', icon: 'ios-copy-outline' },
    ];
  }
  goAboutPage(title, url){
    console.log("go AboutPage");
    this.navCtrl.push(AboutListPage, {
      title: title,
      url: url
    });
  }
}
