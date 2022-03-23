import * as Parse from 'parse';
import { environment } from 'src/environments/environment';

export function initParse() {
  let serverURL = environment.parseConfig.serverURL;
  // 初始化Parse DB。
  Parse.initialize(environment.parseConfig.appId);
  (Parse as any).serverURL = serverURL;
}
