import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { InboxReplyPage } from '../inbox-reply/inbox-reply'

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {
items: Array<{avatar: string, name: string, rate:string, comments:string, username:string, timeout:string }>;

  person_id:string;
  inboxData:any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public userService: UserService,

  ) {
    this.items = [
          { avatar: 'assets/icon/avatar.png', name: 'Kenji Oyama', rate:'$2.5-3.5', comments:'This Policy applies to the SWTCH Website and also applies to the SWTCH App.', username:'oyamamadam', timeout: '7h ago' },
          { avatar: 'assets/icon/avatar1.png', name: 'Evan Shabsove', rate:'$3.5-4.5', comments:'This Kenji Oyama SWTCH Website and also applies to the SWTCH App.', username:'evan_shabsove', timeout: '10h ago' },
          { avatar: 'assets/icon/avatar2.png', name: 'Laura Bryson', rate:'$2.5-3.5',comments:'This Laura Bryson SWTCH Website and also applies to the SWTCH App.', username:'laura_bryson', timeout: '11h ago' },
          { avatar: 'assets/icon/avatar3.png', name: 'Kenji Oyama', rate:'$2.5-3.5', comments:'This Policy applies to the SWTCH Website and also applies to the SWTCH App.', username:'oyamamadam', timeout: '12h ago' },
          { avatar: 'assets/icon/avatar4.png', name: 'Evan Shabsove', rate:'$3.5-4.5', comments:'This Kenji Oyama SWTCH Website and also applies to the SWTCH App.', username:'evan_shabsove', timeout: '15h ago' },
          { avatar: 'assets/icon/avatar.png', name: 'Laura Bryson', rate:'$2.5-3.5',comments:'This Laura Bryson SWTCH Website and also applies to the SWTCH App.', username:'laura_bryson', timeout: '17h ago' },
        ];

        this.person_id = "";
  }

  ngOnInit(){
    this.person_id = window.localStorage.getItem('person_id');
    this.person_id = 'F2z8qVPuveLvUgsIJN1wXw';
    this.getInboxData(this.person_id);
  }

  getInboxData(id){

    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.getInboxData(id)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           console.log('inboxData', data);
           this.inboxData = data;
         }
      },
      (error) => {
        console.log(error);
      });
  }

  goInboxReplyPage(val){
    console.log('go UserProfile Page');
    let profileModal = this.modalCtrl.create( InboxReplyPage );
    profileModal.present();
  };


}
