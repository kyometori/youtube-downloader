import type { filenameResolverOptions } from '../types';

export function filenameResolver(options: filenameResolverOptions) {
  const now = new Date();
  const { markdown, title, index } = options;
  return markdown
    .replace(/<title>/g, title)
    .replace(/<index>/g,  `${index}`)
    .replace(/<year>/g, `${now.getFullYear()}`)
    .replace(/<month>/g, `${now.getMonth()+1}`)
    .replace(/<date>/g, `${now.getDate()}`)
    .replace(/\//g, '|');
}
