import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { applyDomino } from '@ntegral/ngx-universal-window';
import { QueryShareInfoService } from 'src/app/service/query-share-info.service';
const bodyParser = require('body-parser')
const BROWSER_DIR = join(process.cwd(), 'dist/MabowShare/browser');
applyDomino(global, join(BROWSER_DIR, 'index.html'));
import { request } from 'http';
const http = require('http');
const isBot = (req: any) => {
  /**
   * A default set of user agent patterns for bots/crawlers that do not perform
   * well with pages that require JavaScript.
   */
  const botUserAgents = [
    'baiduspider',
    'bingbot',
    'embedly',
    'facebookexternalhit',
    'linkedinbot',
    'outbrain',
    'pinterest',
    'quora link preview',
    'rogerbot',
    'showyoubot',
    'slackbot',
    'twitterbot',
    'vkShare',
    'W3C_Validator',
    'whatsapp'
  ];

  const userAgentPattern = new RegExp(botUserAgents.join('|'), 'i');

  let ua = req.headers['user-agent'];
  return ua !== undefined && userAgentPattern.test(ua);
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/MabowShare/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.use(bodyParser.text({ type: '*/*' }))

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    if (isBot(req)) {
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl, res: res }] });
    } else {
      const url = req.url.replace('/', '');
      const data = JSON.stringify({ objectId: url })
      const options = {
        hostname: 'socialshare.link',
        port: 8082,
        path: '/find_preview_info',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const request = http.request(options, (resp: any) => {

        var chunks: any[] = [];
        resp.on('data', (chunk: any) => {
          chunks.push(chunk);
        })
        resp.on("end", () => {
          var body: any = Buffer.concat(chunks);
          var json_object: any = JSON.parse(body);

          //console.log(json_object);
          console.log(json_object.targetUrl);
          res.redirect(json_object.targetUrl);
        });
      })

      request.on('error', (error: any) => {
        console.error(error)
      })
      console.log(data)

      request.write(data)
      request.end()

    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
