FROM node:14-alpine AS crypto

WORKDIR /src

RUN npm install

EXPOSE 8090