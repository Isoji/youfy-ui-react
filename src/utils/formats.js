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

  // converts invalidWords array to RegExp
  const re = new RegExp(invalidWords.join('|'), 'gi');

  // converting incoming title to string and then removing invalidWords from it
  title = title.toString();
  title = title.replaceAll(re, '');
  title = title.replace(/  +/g, ' ');

  return title;
};
