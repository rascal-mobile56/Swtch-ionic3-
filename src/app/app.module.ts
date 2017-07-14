import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { NgCalendarModule  } from 'ionic2-calendar';

// import 'font-awesome';

import { MyApp } from './app.component';

import { HomeTabPage } from '../pages/home-tab-page/home-tab-page';
import { InviteTabPage } from '../pages/invite-tab-page/invite-tab-page';
import { AboutTabPage } from '../pages/about-tab-page/about-tab-page';
import { ContactTabPage } from '../pages/contact-tab-page/contact-tab-page';

import { ListPage } from '../pages/list/list';
import { SocialSignPage } from '../pages/social_sign/social_sign';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { SignupPage } from '../pages/signup/signup';
import { AgreePage } from '../pages/agree/agree';
import { LogoutPage } from '../pages/logout/logout';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { EmailAddPage } from '../pages/email-add/email-add';
import { MessagesListPage } from '../pages/messages-list/messages-list';
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

import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserService } from '../providers/user-service';
import { BaseService } from "../providers/base-service";
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    TabsControllerPage,
    HomeTabPage,
    AboutTabPage,
    InviteTabPage,
    ContactTabPage,
    ListPage,
    SocialSignPage,
    LoginPage,
    ForgotPage,
    SignupPage,
    AgreePage,
    LogoutPage,

    ProfilePage,
    ProfileEditPage,
    EmailAddPage,
    MessagesListPage,
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
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsControllerPage,
    HomeTabPage,
    AboutTabPage,
    ContactTabPage,
    InviteTabPage,

    ListPage,
    SocialSignPage,
    LoginPage,
    ForgotPage,
    SignupPage,
    AgreePage,
    LogoutPage,

    ProfilePage,
    ProfileEditPage,
    EmailAddPage,
    MessagesListPage,
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
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
