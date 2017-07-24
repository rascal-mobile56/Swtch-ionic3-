import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { ListChargerPage } from '../pages/list-charger/list-charger';
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsControllerPage;

  authResult:any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  ) {
      this.platform.ready().then(() => {

        this.statusBar.styleDefault();
        this.splashScreen.hide();

        // This function is part of "Set Up Auth0-Cordova"
        (<any>window).handleOpenURL = (url) => {
          Auth0Cordova.onRedirectUri(url);
        };
      });
  }
}
