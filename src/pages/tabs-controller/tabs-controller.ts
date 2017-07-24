import { Component} from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomeTabPage } from '../home-tab-page/home-tab-page';
import { AboutTabPage } from '../about-tab-page/about-tab-page';
import { ContactTabPage } from '../contact-tab-page/contact-tab-page';
import { InviteTabPage } from '../invite-tab-page/invite-tab-page';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  
  tab1Root: any = HomeTabPage;
  tab2Root: any = AboutTabPage;
  tab3Root: any = ContactTabPage;
  tab4Root: any = InviteTabPage;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
  ) {

    this.menu.swipeEnable(false);
  }

  onPageDidEnter() {
   // the left menu should be disabled on the login page
   this.menu.enable(false);
 }

}
