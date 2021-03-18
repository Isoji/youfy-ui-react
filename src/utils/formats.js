export const formatTitle = (title) => {
  const invalidWords = [
    'extended version',
    'extended format',
    'full song',
    'full video',
    'video',
    'audio',
    'music',
    'unplugged',
    'soundtrack',
    'long version',
    'version longue',
    'slowed',
    'reverb',
    'official',
    'extra extended',
    'lyrics',
    'ncs release',
    'extended radio edit',
    'youtube',
    'lyrical',
    'lyric',
    'live',
    'live performance',
    'live session',
    'live in',
    'feat',
    'featuring',
    '\\.',
    '&',
    ':',
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

export const toMinutes = (millis) => {
  millis = parseInt(millis);
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
