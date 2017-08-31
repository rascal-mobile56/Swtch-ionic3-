import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutListPage } from '../about-list/about-list';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-about-tab',
  templateUrl: 'about-tab-page.html'
})
export class AboutTabPage {
  pages: Array<{title: string, url: any, icon: any}>;
  profile_img:any;
  constructor(
    public navCtrl: NavController,
    public userService: UserService,
  ) {


    this.pages = [
      { title: 'About', url: 'assets/About.html', icon: 'ios-information-circle-outline'},
      { title: 'How it works', url: 'assets/HowItWorks.html', icon: 'ios-paper-outline'},
      { title: 'Privacy', url: 'assets/Privacy.html', icon: 'ios-lock-outline' },
      { title: 'Terms of Use', url: 'assets/TermsOfUse.html', icon: 'ios-copy-outline' },
    ];
  }

  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  goAboutPage(title, url){
    console.log("go AboutPage");
    this.navCtrl.push(AboutListPage, {
      title: title,
      url: url
    });
  }
}
