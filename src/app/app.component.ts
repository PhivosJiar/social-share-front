import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateMetaTagService } from './service/update-meta-tag.service';
import { QueryShareInfoService } from './service/query-share-info.service';
import { IReqShareInfo, IRespSahreInfo } from './service/interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MabowShare';
  // 需要拿去查詢Share Info的object
  shareObject: IReqShareInfo = {
    postId: ''
  }

  // 接收回來的Share Info
  respSahreInfo: IRespSahreInfo | undefined;
  constructor(
    private router: ActivatedRoute,
    private shareService: QueryShareInfoService,
    private metaTagService: UpdateMetaTagService
  ) { }

  ngOnInit(): void {
    this.decodeUrl();
  }

  /**
   * 解析網址並取得share Info
   */
  private decodeUrl(): void {
    this.router.queryParams.subscribe((res: any) => {
      this.shareService.setProductName(res.prod);
      if (res.prod) {
        this.shareObject!.postId = res.objId;
        this.getShareInfo();
      }
    });
  }

  /**
   * 取得後端取回分享資料
   */
  private getShareInfo(): void {
    this.shareService.getShareInfo(this.shareObject!).subscribe(res => {
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
