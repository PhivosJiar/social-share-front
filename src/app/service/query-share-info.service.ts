import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IReqShareInfo, IRespSahreInfo } from './interface'

const GET_SHARE_INFO = "http://50.19.183.134:8082/find_preview_info"
@Injectable({
  providedIn: 'root'
})
export class QueryShareInfoService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param requstInfo 
   */
  public getShareInfo(requstInfo: IReqShareInfo): Observable<IRespSahreInfo> {
    const url = GET_SHARE_INFO;
    return this.http.post<IRespSahreInfo>(url, requstInfo)
  }

}
