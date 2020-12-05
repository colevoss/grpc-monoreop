const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.resolve('proto', 'users.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const users = [
  {
    id: '1',
    name: 'cole',
    email: 'cole@email.com',
  },
];

const service = {
  get(call, callback) {
    const userId = call.request.id;

    const user = users.find((user) => user.id === userId);

    console.log('Found user by id', userId, user);

    if (!user) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Not found',
      });

      return;
    }

    callback(null, user);
  },
};

const PORT = process.env.PORT || 8080;

server.addService(usersProto.UserService.service, service);
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
console.log(`User service started at 127.0.0.1:${PORT}`);
