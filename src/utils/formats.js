export const formatTitle = (title) => {
  const invalidWords = [
    'full song',
    'full video',
    'video',
    'audio',
    'music',
    'unplugged',
    'soundtrack',
    'long version',
    'version longue',
    'by',
    'Official',
    'Extra Extended',
    'main',
    'hd',
    'lyrics',
    'NCS Release',
    'Extended Radio Edit',
    'YouTube',
    'Lyrical',
    'Lyric',
    'Live',
    'Live Performance',
    'Live Session',
    'Live In',
    'feat',
    '\\.',
    'featuring',
    'ft',
    '&',
    '\\|',
    ']',
    '\\[',
    '\\(',
    '\\)',
    '-',
    '\\"',
    '--',
    '#',
    '  +',
  ];

  const re = new RegExp(invalidWords.join('|'), 'gi');

  title = title.toString();
  title = title.replaceAll(re, '');
  title = title.replace(/  +/g, ' ');

  return title;
};
