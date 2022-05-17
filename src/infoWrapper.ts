import ytdl from 'ytdl-core';
import type { YoutubeUrl, DownloadInfos, YTDLVideoData, VideoData, AudioData } from './types';

const videoQuality: { [key: string]: number } = {
  'hd2160': 8,
  'hd1440': 7,
  'hd1080': 6,
  'hd720': 5,
  'large': 4,
  'medium': 3,
  'small': 2,
  'tiny': 1
}

export async function getInfo(url: YoutubeUrl): Promise<DownloadInfos> {
  // get info of the given url
  const info = await ytdl.getInfo(url).catch(() => undefined);

  // no info means no such video
  if (!info) throw new Error('INVALID_VIDEO_LINK');

  // prepare
  const { formats } = info;
  const vids: VideoData[] = [];
  const audios: AudioData[] = [];
  const vidfilter = (f: YTDLVideoData) => {
    if (f.container !== 'mp4') return false;
    if (!f.hasVideo) return false;
    return true;
  }

  const audiofilter = (f: YTDLVideoData) => {
    if (f.container !== 'webm') return false;
    if (f.audioSampleRate !== '48000') return false;
    return true;
  }

  // filter the correct format
  formats.forEach((ele) => {
    if(vidfilter(ele)) {
      vids.push({ url: ele.url, quality: videoQuality[ele.quality], hasAudio: ele.hasAudio });
    }
    if(audiofilter(ele)) {
      audios.push({ url: ele.url });
    }
  })

  vids.sort((a, b) => b.quality - a.quality);

  // return DownloadInfos
  return {
    title: info.videoDetails.title,
    video: vids[0].url,
    audio: audios[0].url,
    videoHasAudio: vids[0].hasAudio
  }
}
