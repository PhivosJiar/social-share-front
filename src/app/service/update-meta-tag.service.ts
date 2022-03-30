import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { IRespSahreInfo } from './interface'

@Injectable({
  providedIn: 'root'
})
export class UpdateMetaTagService {

  constructor(
    private metaService: Meta,
  ) { }
  /**
   * 
   * @param title  string 用於更新og:title
   * @param imgUrl string 用於更新og:image的url
   * @param description (非必填)string 用於更新og:description
   * @todo description目前在facebook分享不會顯示
   */
  public updateTag(shareInfo:IRespSahreInfo): void {
    console.log(shareInfo)
    this.metaService.updateTag({
      property: 'og:title', content: shareInfo.title
    })
    this.metaService.updateTag({
      property: 'og:image', content: shareInfo.image
    })

    if (shareInfo.description) {
      this.metaService.updateTag({
        property: 'og:description', content: shareInfo.description 
      })
    }
  }
}
