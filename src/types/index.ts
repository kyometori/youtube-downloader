export type YoutubeUrl = string;

export interface YTDLVideoData {
  container: string,
  hasVideo: boolean,
  audioSampleRate?: string
}

export interface VideoData {
  url: string,
  quality: number,
  hasAudio: boolean
}

export interface AudioData {
  url: string
}

export interface DownloadInfos {
  title: string,
  video: string,
  audio: string,
  videoHasAudio: boolean
}
