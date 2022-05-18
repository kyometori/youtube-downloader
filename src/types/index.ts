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

export interface filenameResolverOptions {
  markdown: string,
  title: string,
  index: number
}

export interface DownloadOptions {
  url: YoutubeUrl,
  filename: string,
  index: number,
  folder: string,
  audioonly: boolean
}

export interface getDownloadEvalContextArg {
  title: string,
  folder: string,
  video: string,
  audio: string,
  audioonly: boolean,
  videoHasAudio: boolean
}
