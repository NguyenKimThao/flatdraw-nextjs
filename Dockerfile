FROM node:20-alpine

WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY package.json package.json

USER node

RUN npm install --force

COPY --chown=node:node . .

ENTRYPOINT ["npm", "start"]