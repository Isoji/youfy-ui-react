export const formatTitle = (title) => {
  const invalidWords = [
    "extended version",
    "extended format",
    "full song",
    "full video",
    "video",
    "audio",
    "music",
    "unplugged",
    "soundtrack",
    "long version",
    "version longue",
    "by",
    "official",
    "extra extended",
    "main",
    "hd",
    "lyrics",
    "ncs release",
    "extended radio edit",
    "youtube",
    "lyrical",
    "lyric",
    "live",
    "live performance",
    "live session",
    "live in",
    "feat",
    "\\.",
    "featuring",
    "ft",
    "&",
    ":",
    "\\|",
    "]",
    "\\[",
    "\\(",
    "\\)",
    "-",
    '\\"',
    "--",
    "#",
    "  +",
  ];

  // converts invalidWords array to RegExp
  const re = new RegExp(invalidWords.join("|"), "gi");

  // converting incoming title to string and then removing invalidWords from it
  title = title.toString();
  title = title.replaceAll(re, "");
  title = title.replace(/  +/g, " ");

  return title;
};
