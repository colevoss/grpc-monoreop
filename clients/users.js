const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const promisify = require('./promisify');

const PROTO_PATH = path.resolve('proto', 'users.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition);

const UserService = usersProto.UserService;

const client = new UserService(
  // 'user-service:8081',
  'user-service-7krogfhpta-uc.a.run.app:443',
  grpc.credentials.createInsecure(),
);

grpc.waitForClientReady(client, Date.now() + 1000, (err) => {
  console.log(err || 'User Client Ready');
});

module.exports = client;
// module.exports = promisify(client);
