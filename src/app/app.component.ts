import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';

import { HomeTabPage } from '../pages/home-tab-page/home-tab-page';
import { AboutTabPage} from '../pages/about-tab-page/about-tab-page';
import { ContactTabPage } from '../pages/contact-tab-page/contact-tab-page';
import { InviteTabPage } from '../pages/invite-tab-page/invite-tab-page';
// import { ListPage } from '../pages/list/list';
import { SocialSignPage } from '../pages/social_sign/social_sign';
import { LogoutPage } from '../pages/logout/logout';
import { ProfilePage } from '../pages/profile/profile';
import { ManagePage } from '../pages/manage/manage';
import { MessagesListPage } from '../pages/messages-list/messages-list';
import { SettingsPage } from '../pages/settings/settings';

// Vertual page-user-profile
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserInfoPage } from '../pages/user-info/user-info';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AboutTabPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsControllerPage, icon: 'ios-home'},
      { title: 'Profile', component: ProfilePage, icon: 'ios-person'},
      { title: 'Messages', component: MessagesListPage, icon: 'ios-text' },
      { title: 'Manage Listings', component: ManagePage, icon: 'ios-construct' },
      { title: 'Settings', component: SettingsPage, icon: 'ios-settings' },
      { title: 'Log Out', component: LogoutPage, icon: 'md-log-in' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
