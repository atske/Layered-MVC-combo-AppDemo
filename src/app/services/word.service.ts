import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngWords } from '../models/angwords';

@Injectable()
export class WordService {

  private _getUrl = '/api/words';
  private _postUrl = '/api/word';

  constructor(private _http: Http) { }

  getWords() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }

  addWord(word: AngWords) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this._postUrl, JSON.stringify(word), options)
    .map((response: Response) => response.json());
    // .toPromise()
    // .then((response: Response) => response.json());
  }
}
