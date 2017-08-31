import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ModalController } from 'ionic-angular';

import * as _ from 'lodash';
import { UserService } from '../../services/user-service';
import { MessagesSendingPage } from '../message-sending/message-sending';
import { BookingPage } from '../booking/booking';

declare var google;

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  @ViewChild('map') mapElement: ElementRef;
    map: any;

    public profile_img:any;
    public id:string;
    public user_id:string;
    public my_id:string;
    public profileData:any = { vailability:'', open:'', title:'',description:'', price_cents:'' };
    public user_Recieve:any;
    public author:any = { family_name:'', given_name:'', id:'', image_file_name:''};
    public location:any = { address:'', latitude:'', longitude:''}
    public comments:any;
    public bg_img:string;
    public placeholder:string;

    public review_Value: number;
    public review_ok: number;
    public review_percent: number;

    eventSource;
    weekly_schedules: any;
    weekly_updated:any;
    weeks:any[];
    week
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'day',
        currentDate: new Date()
    };
    selectedDate: Date = new Date();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public modalCtrl: ModalController,
  ) {
    this.id = navParams.get("id");
    this.user_id = navParams.get("user_id");
    console.log('id',this.id, this.user_id);
    this.my_id = window.localStorage.getItem('person_id');
    this.placeholder = "Comment on the listing or ask for more details. All ther other users will be able to see your comment."
    this.weeks = [  {id:0, week:'Sunday:'}, { id:1, week:'Monday:'}, { id:2, week:'Tuesday:'}, {id:3, week:'Wednesday:'},
                    {id:4, week:'Thursday:'}, { id:5, week:'Friday:'}, { id:6, week:'Saturday:'}];
  }

  ionViewDidLoad(){

    this.userProfileData();
  }

  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  userProfileData(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.getProfileData(this.id)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           console.log(data);
           this.profileData = data.listing;
           this.user_Recieve = data.user_testimonials;
           this.author = data.listing.author;
           console.log('person_id', this.author.id);
           this.location = data.listing.location;
           this.weekly_schedules =  data.listing.weekly_schedules;
           this.weekly_updated = data.listing.weekly_schedules[0].updated_at;

           if(this.profileData.listing_images.length > 0){
             this.bg_img = 'https://swtch.cloud/system/images/'+ this.profileData.listing_images[0].id + '/big/' + this.profileData.listing_images[0].image_file_name;
           }else{
             this.bg_img = 'assets/image/blank.png';
           }
           this.comments = data.listing.comments;
           console.log(this.comments);

           if(this.user_Recieve.length > 0){
             this.review_Value = this.user_Recieve.length;

             this.review_ok = 0;
             for(var i=0; i<this.user_Recieve.length; i++){
               this.review_ok += this.user_Recieve[i].grade;
             }

             this.review_percent = this.review_ok / this.review_Value * 100;
             console.log( 'Reveiw Value', this.review_Value);
             console.log("SUM: " + this.review_ok);
             console.log("percent", this.review_percent);
           }
           this.loadMap(this.location.latitude, this.location.longitude);
           this.addMarker();
           this.loadEvents();
         }
        },
        (error) => {
          loading.dismiss();
          console.log(error);
      });
  }

  loadEvents() {
    this.eventSource = [];
    // console.log("randomevent", this.eventSource);
    let nowDate = this.selectedDate.getDay();
    let that = this;
    this.weekly_schedules.map(function(schedule){
      if(nowDate == schedule.day_of_week){
        let event = {startTime: schedule.start_hour, endTime: schedule.end_hour};
        let newEvent = that.makingEvent(event);
        that.eventSource = that.eventSource.concat(newEvent);
      }

    });
  }

  makingEvent(event){
    let startDate = _.clone(this.selectedDate);
    let endDate = _.clone(this.selectedDate);
    let startT = event.startTime.split(":");
    let endT = event.endTime.split(":");
    startDate.setHours(startT[0]);
    startDate.setMinutes(startT[1]);

    if(endT[0] == '00' && startT[0] != '00') {
      endDate.setHours('24');
    } else {
      endDate.setHours(endT[0]);
    }

    endDate.setMinutes(endT[1]);

    return {startTime: startDate, endTime:endDate};
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
    //         (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    if(this.selectedDate.getDay() == ev.selectedTime.getDay()) {
    } else {
      this.selectedDate = ev.selectedTime;
      console.log("selectedDate", this.selectedDate);
      this.loadEvents();
    }
  }

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }
    return events;
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }

  goBookingModal(){
    console.log('kkkkk');
    let profileModal = this.modalCtrl.create(BookingPage, { id: this.id});
    profileModal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendMessagePage(name){
    this.navCtrl.push(MessagesSendingPage,{
      name: this.author.given_name,
    });
  }

}
