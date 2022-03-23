import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Parse from 'parse';

// const GET_SHARE_INFO = "https://a0ca-106-107-177-174.ngrok.io/metainfo"
@Injectable({
  providedIn: 'root'
})
export class QueryShareInfoService {

  constructor(
    private http: HttpClient
  ) { }

  public getShareInfo(pageObjectId: string) {
    const query = new Parse.Query(Parse.Object.extend('SocialShareInfo'));
    query.equalTo('objectId', pageObjectId);

    return query.first();
  }

}
