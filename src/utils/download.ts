import { Worker } from 'node:worker_threads';
import { existsSync, mkdirSync } from 'node:fs';
import { ChildProcess, exec } from 'node:child_process';
import { join } from 'node:path';
import type { YoutubeUrl, DownloadOptions, getDownloadEvalContextArg } from '../types';
import { getDownloadInfo } from './infoWrapper';
import { filenameResolver } from './filenameResolver';
import ffmpeg from 'ffmpeg-static';
import shell from 'shell-escape';

export async function download({
  url, filename, index, folder, audioonly
}: DownloadOptions): Promise<ChildProcess> {
  if (!existsSync(folder)) {
    mkdirSync(folder);
  }

  const { title, video, audio, videoHasAudio } = await getDownloadInfo(url);

  const outputTitle = !!filename && filename !== '' ?  filenameResolver({
    markdown: filename,
    title: title,
    index: index
  }) : title;

  const proc = exec(getExecuteContext({
    title: outputTitle,
    audioonly, folder, video, audio, videoHasAudio
  }));

  function cleanUp() {
    try {
      proc.kill();
      process.exit();
    } catch {}
  };

  const processExitEvents = [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`];
  const childExitEvents = [`exit`, `error`, `disconnect`];

  processExitEvents.forEach((eventType) => {
    process.on(eventType, cleanUp);
  });

  childExitEvents.forEach((eventType) => {
    proc.on(eventType, () => {
      processExitEvents.forEach((processEventType) => process.removeListener(processEventType, cleanUp));
    });
  });

  return proc;

}

function getExecuteContext({
  title, audioonly, folder, video, audio, videoHasAudio
}: getDownloadEvalContextArg): string {

  const context = audioonly ?
    shell([
      ffmpeg, '-y', '-v', 'error',
      '-i', audio, '-c:a', 'mp3',
      '-format', 'mp3', `${folder}/${title}.mp3`
    ])
    : videoHasAudio ?
    shell([
      ffmpeg, '-y', '-v', 'error',
      '-i', video,'-c', 'copy',
      `${folder}/${title}.mp4`
    ])
    :
    shell([
      ffmpeg, '-y', '-v', 'error',
      '-i', video, '-i', audio,
      '-c:v', 'copy', '-c:a', 'aac',
      `${folder}/${title}.mp4`
    ]);

  return context;
}
