FROM alpine:3.13

RUN apk add --update --no-cache nodejs npm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

RUN npm install --only=production

COPY . ./

CMD [ "node", "app.js" ]