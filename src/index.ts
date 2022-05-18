import { download } from './utils/download';
import { playlistResolver } from './utils/playlistResolver';
import type { VideoDownloadOptions, VideosDownloadOptions, PlaylistDownloadOptions } from './types';
import type { ChildProcess } from 'node:child_process';

export function videoDownload({
  url, filename = '<title>', folder = 'result', audioonly = true
}: VideoDownloadOptions): Promise<ChildProcess> {
  return download({ url, filename, index: 1, folder, audioonly });
}

export function videosDownload({
  urls, filename = '<title>', folder = 'result', audioonly = true
}: VideosDownloadOptions): Promise<ChildProcess>[] {
  return urls.map((url, index: number) => {
    return download({ url, filename, index: index+1, folder, audioonly });
  });
}

export async function playlistDownload({
  url, filename = '<title>', folder = 'result', audioonly = true
}: PlaylistDownloadOptions): Promise<Promise<ChildProcess>[]> {
  const urls = await playlistResolver(url);
  return videosDownload({ urls, filename, folder, audioonly });
}
