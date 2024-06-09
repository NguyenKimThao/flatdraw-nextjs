FROM node:20-alpine

WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY package*.json ./

USER node

RUN npm install

EXPOSE 8010

COPY --chown=node:node . .

ENTRYPOINT [ "npm", "start" ]
