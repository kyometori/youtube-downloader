import ytpl from 'ytpl';
import type { YoutubeUrl } from '../types';

export async function playlistResolver(url: YoutubeUrl): Promise<YoutubeUrl[]> {
  const pl = await ytpl(url, { pages: Infinity}).catch(() => undefined);
  if (!pl) throw new Error('INVALID_PLAYLIST_LINK');

  const urls = pl.items
    .filter(video => video.title !== 'Private video' && video.title !== 'Deleted video')
    .map(item => item.shortUrl);

  if (!urls) throw new Error('INVALID_PLAYLIST');
  return urls;
}
