FROM node:18.18.0-alpine

RUN mkdir -p /usr/src/app && \
    chown -R node:node /usr/src/app 

WORKDIR /usr/src/app

USER node

COPY --chown=node:node . .

RUN npm ci

RUN npm install serve

RUN npm run build

EXPOSE 5173

CMD ["npx", "serve", "-s", "dist", "-l", "5173"]