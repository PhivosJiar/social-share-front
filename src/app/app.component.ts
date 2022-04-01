import { Component, OnInit } from '@angular/core';
import { UpdateMetaTagService } from './service/update-meta-tag.service';
import { QueryShareInfoService } from './service/query-share-info.service';
import { IReqShareInfo, IRespSahreInfo } from './service/interface'
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SocialShare';
  // 需要拿去查詢Share Info的object
  private requstInfo: IReqShareInfo = {
    objectId: ''
  }

  // 接收回來的Share Info
  respSahreInfo: IRespSahreInfo | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shareService: QueryShareInfoService,
    private metaTagService: UpdateMetaTagService
  ) { }

  ngOnInit(): void {
    this.decodeObjectIdFromUrl();
    this.getShareInfo();
  }

  /**
   * 解析網址取得objectId
   */
  private decodeObjectIdFromUrl(): void {
    this.activatedRoute.url.forEach(item => {
      this.requstInfo.objectId = item[0].path;
    })
  }

  /**
   * 取得後端取回分享資料
   */
  private getShareInfo(): void {
    if (!this.requstInfo.objectId) {
      return;
    }

    this.shareService.getShareInfo(this.requstInfo!).subscribe(res => {
      this.respSahreInfo = res;
      this.updateMetaTag();
    });
  }

  /**
   *  更新meta tag
   */
  private updateMetaTag(): void {
    this.metaTagService.updateTag(this.respSahreInfo!)
  }
}
