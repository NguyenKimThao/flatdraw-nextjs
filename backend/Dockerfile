FROM node:10-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY package*.json ./

USER node

RUN npm install

EXPOSE 8090

EXPOSE 8091

COPY --chown=node:node . .

ENTRYPOINT [ "npm", "start" ]
