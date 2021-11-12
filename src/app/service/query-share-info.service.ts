import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IReqShareInfo, IRespSahreInfo } from './interface'

const GET_SHARE_INFO = "https://a0ca-106-107-177-174.ngrok.io/metainfo"
@Injectable({
  providedIn: 'root'
})
export class QueryShareInfoService {

  constructor(
    private http: HttpClient
  ) { }

  //使用分享的產品-名稱
  private productName: string | undefined

  /**
   * 未來若查詢的API URL超過一種 使用這個func來設定
   * 
   */
  private generatorApiUrl(){
    return GET_SHARE_INFO
  } 

  /**
   * 因應未來有其他產品共用 但實際結構待討論
   * @param prodName 產品名稱 
   */
  public setProductName(prodName: string) {
    this.productName = prodName;
  }

  /**
   * 
   * @param requstInfo 
   */
  public getShareInfo(requstInfo: IReqShareInfo):Observable<IRespSahreInfo>{
    const url = this.generatorApiUrl();
    return this.http.post<IRespSahreInfo>(url, requstInfo)
  }

}
