
import { AngUsers } from './../models/angusers';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

  private _postUrl = '/api/user';

  constructor(private _http: Http) { }

  addUser(user: AngUsers) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(user), options)
     .map((response: Response) => response.json());
     // .toPromise()
     // .then((response: Response) => response.json());
  }

}
