const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const promisify = require('./promisify');

const PROTO_PATH = path.resolve('proto', 'playlists.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const playlistsProto = grpc.loadPackageDefinition(packageDefinition);

const PlaylistService = playlistsProto.PlaylistService;

const client = new PlaylistService(
  // 'playlist-service:8080',
  'playlist-service-7krogfhpta-uc.a.run.app:443',
  grpc.credentials.createInsecure(),
);

grpc.waitForClientReady(client, Date.now() + 1000, (err) => {
  console.log(err || 'Playlist Client Ready');
});

// module.exports = promisify(client);
module.exports = client;
