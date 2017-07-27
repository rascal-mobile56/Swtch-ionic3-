import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BaseService {

  public baseUrl = "https://swtch.cloud/api/v1/";
  public callbackUrl = "http://swtch.cloud/auth0/callback";
  public peopleUrl = this.baseUrl + "people/";



  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }


}
