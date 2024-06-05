FROM node:20-alpine AS build

WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY package.json package.json

RUN npm install -g npm@10.8.1

USER node

RUN npm install --force

COPY --chown=node:node . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /home/node/app/out /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
