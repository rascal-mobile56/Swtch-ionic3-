import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutListPage } from '../about-list/about-list';

@Component({
  selector: 'page-about-tab',
  templateUrl: 'about-tab-page.html'
})
export class AboutTabPage {
  pages: Array<{title: string, url: any, icon: any}>;
  person:any;
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

  ionViewWillEnter(){
    this.person = JSON.parse(window.localStorage.getItem('profile'));
    console.log(this.person);
  }

  goAboutPage(title, url){
    console.log("go AboutPage");
    this.navCtrl.push(AboutListPage, {
      title: title,
      url: url
    });
  }
}
