import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { NgCalendarModule  } from 'ionic2-calendar';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { Geolocation} from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { HomeTabPage } from '../pages/home-tab-page/home-tab-page';
import { InviteTabPage } from '../pages/invite-tab-page/invite-tab-page';
import { AboutTabPage } from '../pages/about-tab-page/about-tab-page';
import { ContactTabPage } from '../pages/contact-tab-page/contact-tab-page';

import { SignPage } from '../pages/sign/sign';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { EmailAddPage } from '../pages/email-add/email-add';
import { InboxPage } from '../pages/inbox/inbox';
import { MessagesSendingPage } from '../pages/message-sending/message-sending'
import { InviteFriendPage } from '../pages/invite-friend/invite-friend';
import { ContactTeamPage } from '../pages/contact-team/contact-team'
import { ManagePage } from '../pages/manage/manage';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { NotificationPage } from '../pages/notification/notification';
import { CarDetailsPage } from '../pages/car-details/car-details';
import { PaymentPage } from '../pages/payment/payment';
import { AboutListPage } from '../pages/about-list/about-list';
import { UserInfoPage } from '../pages/user-info/user-info';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ListChargerPage } from '../pages/list-charger/list-charger';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../services/user-service';
import { BaseService } from "../services/base-service";
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    MyApp,
    TabsControllerPage,
    HomeTabPage,
    AboutTabPage,
    InviteTabPage,
    ContactTabPage,
    SignPage,

    ProfilePage,
    ProfileEditPage,
    EmailAddPage,
    InboxPage,
    MessagesSendingPage,
    InviteFriendPage,
    ContactTeamPage,
    ManagePage,
    ListChargerPage,
    SettingsPage,
    AccountPage,
    NotificationPage,
    CarDetailsPage,
    PaymentPage,
    AboutListPage,
    UserInfoPage,
    UserProfilePage,

  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsControllerPage,
    HomeTabPage,
    AboutTabPage,
    ContactTabPage,
    InviteTabPage,
    SignPage,
    ListChargerPage,
    ProfilePage,
    ProfileEditPage,
    EmailAddPage,
    InboxPage,
    MessagesSendingPage,
    InviteFriendPage,
    ContactTeamPage,
    ManagePage,
    SettingsPage,
    AccountPage,
    NotificationPage,
    CarDetailsPage,
    PaymentPage,
    AboutListPage,
    UserInfoPage,
    UserProfilePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    BaseService,
    AuthService,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
