export const getPlId = (url) => {
  const playlistId = url.split('=')[1];
  return playlistId;
};
