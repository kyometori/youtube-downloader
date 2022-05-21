# Youtube Downloader
[![npm version](https://img.shields.io/npm/v/@kyometori/yt-downloader.svg?maxAge=3600)](https://www.npmjs.com/package/@kyometori/yt-downloader)
[![Downloads](https://img.shields.io/npm/dt/@kyometori/yt-downloader.svg?maxAge=3600)](https://www.npmjs.com/package/@kyometori/yt-downloader)
[![Last Commit](https://img.shields.io/github/last-commit/kyometori/youtube-downloader)](https://github.com/kyometori/youtube-downloader)
[![Code Size](https://img.shields.io/github/languages/code-size/kyometori/youtube-downloader)](https://github.com/kyometori/youtube-downloader)
![License](https://img.shields.io/github/license/kyometori/youtube-downloader)

一個簡單的 Youtube 影音下載小工具。

# Warning
This package can't run expectedly on Windows and I don't know why. If you can find the bug please help me.

## 使用前
在你使用之前，你必須自行安裝以下套件：
- [`ffmpeg-static`](https://www.npmjs.com/package/ffmpeg-static)

然後安裝此套件
```
npm i --save @kyometori/yt-downloader
```

## 開始使用
首先，先引入此套件
```js
/* CommonJS */
const { videoDownload, videosDownload, playlistDownload } = require('@kyometori/yt-downloader');

/* ModuleJS */
import { videoDownload, videosDownload, playlistDownload } from '@kyometori/yt-downloader'
```

### 下載單一影片
```js
videoDownload({ ...options });
```
其中 options 包括以下內容：
- `url`：目標影片連結
- `filename`：會出影片的檔名，預設為影片標題。
- `folder`：檔案匯出的資料夾，預設為 `result`。使用相對路徑時，他為「相對於程式執行時的路徑」。
- `audioonly`：是否只下載音檔，預設為 `true`。

回傳值：`Promise<ChildProcess>`  
範例：
```js
videoDownload({
  url: 'https://www.youtube.com/watch?v=qX1xe1RzA94',
  filename: 'audio',
  folder: '../music',
  audioonly: true
})
```

### 批量下載影片
```js
videosDownload({ ...options });
```
其中 options 包括以下內容：
- `urls`：一個陣列，裡面是所有要被下載的影片連結。
- `filename`：會出影片的檔名，預設為影片標題。
- `folder`：檔案匯出的資料夾，預設為 `result`。使用相對路徑時，他為「相對於程式執行時的路徑」。
- `audioonly`：是否只下載音檔，預設為 `true`。

回傳值：`Promise<ChildProcess>[]`  
範例：
```js
videosDownload({
  urls: [
    'https://www.youtube.com/watch?v=35FxbLTlGNI',
    'https://www.youtube.com/watch?v=OTRcHcyolUM',
    'https://www.youtube.com/watch?v=OvLE3VQ18UY',
    'https://www.youtube.com/watch?v=807atqeFsVA',
    'https://www.youtube.com/watch?v=TZC02UdbStM',
    'https://www.youtube.com/watch?v=qQEbHEjne9M'
  ],
  filename: '<title>',
  folder: '../music',
  audioonly: true
})
```

### 下載播放清單
```js
playlistDownload({...options});
```
其中 options 包括以下內容：
- `url`：目標播放清單連結
- `filename`：會出影片的檔名，預設為影片標題。
- `folder`：檔案匯出的資料夾，預設為 `result`。使用相對路徑時，他為「相對於程式執行時的路徑」。
- `audioonly`：是否只下載音檔，預設為 `true`。

回傳值：`Promise<Promise<ChildProcess>[]>`  
範例：
```js
playlistDownload({
    url: 'https://www.youtube.com/playlist?list=PLFPTffQioGfYFs7Az7h0PusfVyCPI6iVe',
    folder: 'exports',
    audioonly: false
});
```

### 檔名 Markdown
在影片檔案的 filename 選項可以填入檔名，其中以下幾個特殊字眼會被解譯成特殊的字符，讓你可以更彈性的指定標題，包含以下：
- &lt;title&gt;：影片的原標題
- &lt;year&gt;：當前時間西元年
- &lt;month&gt;：當前時間月
- &lt;date&gt;：當前時間日
- &lt;index&gt;：當前影片順位

其中 `<index>` 在一般的影片都是 1 號，只有在使用 `playlistDownload` 和 `videosDownload` 時才會依據那個影片被下載的順序來填入。

範例程式：
```js
playlistDownload({
    url: 'https://www.youtube.com/playlist?list=PLGejWpTS0U0Ix0pa3UZJE4LMWGm7IHcqs',
    folder: 'goodmusics',
    filename: '<year>-<month>-<date>_<index>'
})
```
範例輸出（檔名）：
```
2021-8-5_1.mp4
2021-8-5_2.mp4
2021-8-5_3.mp4
...
```
