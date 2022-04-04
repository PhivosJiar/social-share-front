import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IReqShareInfo, IRespSahreInfo } from './interface'

const GET_SHARE_INFO = "https://socialshare.link/api/find_preview_info"
@Injectable({
  providedIn: 'root'
})
export class QueryShareInfoService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * call api 取得分享連結預覽資訊
   * @param requstInfo 
   */
  public getShareInfo(requstInfo: IReqShareInfo): Observable<IRespSahreInfo> {
    const url = GET_SHARE_INFO;
    return this.http.post<IRespSahreInfo>(url, requstInfo)
  }

}
