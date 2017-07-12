import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-messages-list',
  templateUrl: 'messages-list.html'
})
export class MessagesListPage {
items: Array<{avatar: string, name: string, rate:string, comments:string, username:string, timeout:string }>;
  constructor(
    public navCtrl: NavController,

  ) {
    this.items = [
          { avatar: 'assets/icon/avatar.png', name: 'Kenji Oyama', rate:'$2.5-3.5', comments:'This Policy applies to the SWTCH Website and also applies to the SWTCH App.', username:'oyamamadam', timeout: '7 hours' },
          { avatar: 'assets/icon/avatar1.png', name: 'Evan Shabsove', rate:'$3.5-4.5', comments:'This Kenji Oyama SWTCH Website and also applies to the SWTCH App.', username:'evan_shabsove', timeout: '10 hours' },
          { avatar: 'assets/icon/avatar2.png', name: 'Laura Bryson', rate:'$2.5-3.5',comments:'This Laura Bryson SWTCH Website and also applies to the SWTCH App.', username:'laura_bryson', timeout: '11 hours' },
          { avatar: 'assets/icon/avatar3.png', name: 'Kenji Oyama', rate:'$2.5-3.5', comments:'This Policy applies to the SWTCH Website and also applies to the SWTCH App.', username:'oyamamadam', timeout: '12 hours' },
          { avatar: 'assets/icon/avatar4.png', name: 'Evan Shabsove', rate:'$3.5-4.5', comments:'This Kenji Oyama SWTCH Website and also applies to the SWTCH App.', username:'evan_shabsove', timeout: '15 hours' },
          { avatar: 'assets/icon/avatar.png', name: 'Laura Bryson', rate:'$2.5-3.5',comments:'This Laura Bryson SWTCH Website and also applies to the SWTCH App.', username:'laura_bryson', timeout: '17 hours' },
        ];
  }



}
