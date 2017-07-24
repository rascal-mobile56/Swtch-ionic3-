import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BaseService {

  //public baseUrl = "http://beta.myidband.com/api/v5/";
  public baseUrl = "https://swtch.cloud";
  public listingsUrl = this.baseUrl + "/api/v1/listings"; 

  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }


}
