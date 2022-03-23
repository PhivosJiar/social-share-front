import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateMetaTagService } from './service/update-meta-tag.service';
import { QueryShareInfoService } from './service/query-share-info.service';
import { IRespSahreInfo } from './service/interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MabowShare';

  private pageObjectId: string = '';

  constructor(
    private router: ActivatedRoute,
    private shareService: QueryShareInfoService,
    private metaTagService: UpdateMetaTagService
  ) { }

  ngOnInit(): void {
    // document.location.href="https://www.google.com/";
    this.initData();
  }

  private async initData() {
    this.decodeUrl();
    const socialShareInfo = await this.getSocialShareInfo();
    this.updateMetaTag(socialShareInfo);
  }
  /**
   * 解析網址
   */
  private decodeUrl(): void {
    this.pageObjectId = location.pathname.replace('/', '');
  }

  /**
   * 取得社群分享title、imageUrl、description資訊
   */
  private async getSocialShareInfo() {
    const a = await this.shareService.getShareInfo(this.pageObjectId);
    const { title, imageUrl, description } = a!.attributes;
    const param: IRespSahreInfo = {
      title,
      imageUrl,
      description
    }

    return param;
  }

  /**
   *  更新meta tag
   */
  private updateMetaTag(socialShareInfo: IRespSahreInfo): void {
    this.metaTagService.updateTag(socialShareInfo)
  }
}
