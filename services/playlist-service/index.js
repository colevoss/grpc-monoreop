const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.resolve('proto', 'playlists.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const playlistsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const playlists = [
  {
    id: 'playlist-1',
    name: 'Cool playlist',
    userId: '1',
  },
  {
    id: 'playlist-2',
    name: 'Awesome playlist',
    userId: '1',
  },
  {
    id: 'playlist-3',
    name: 'Dumb playlist',
    userId: '2',
  },
];

const service = {
  userPlaylists(call, callback) {
    const userId = call.request.userId;

    const userPlaylists = playlists.filter((playlist) => {
      return playlist.userId === userId;
    });

    console.log('Found playlists for user', userId, userPlaylists);

    callback(null, { playlists: userPlaylists });
  },
};

const PORT = process.env.PORT || 8080;

server.addService(playlistsProto.PlaylistService.service, service);
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.err(err);
      return;
    }

    console.log(`Playlist service started at 127.0.0.1:${port}`);
    server.start();
  },
);
