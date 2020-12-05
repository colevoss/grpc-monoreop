FROM node:12 AS base

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./proto ./proto
COPY ./clients ./clients
COPY ./services/playlist-service ./services/playlist-service

RUN yarn workspace playlist-service install

ENV GRPC_TRACE=all
ENV GRPC_VERBOSITY=DEBUG

CMD ["node", "./services/playlist-service/index.js"]