const userClient = require('./users');
const playlistClient = require('./playlists');

module.exports = {
  users: userClient,
  playlists: playlistClient,
};
