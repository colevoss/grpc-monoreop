FROM node:12 AS base

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./proto ./proto
COPY ./clients ./clients
COPY ./services/user-service ./services/user-service

RUN yarn workspace user-service install

ENV GRPC_TRACE=all
ENV GRPC_VERBOSITY=DEBUG

CMD ["node", "./services/user-service/index.js"]