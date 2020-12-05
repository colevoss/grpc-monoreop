FROM node:12 AS base

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .
COPY ./proto ./proto
COPY ./clients ./clients
COPY ./services/gateway ./services/gateway

RUN yarn workspace gateway install

ENV GRPC_TRACE=all
ENV GRPC_VERBOSITY=DEBUG

CMD ["node", "./services/gateway/index.js"]