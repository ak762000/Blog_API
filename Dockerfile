FROM node:alpine

WORKDIR /usr/src

RUN apk --no-cache add \
    python3 \
    make \
    g++ \
    && npm install -g node-pre-gyp

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]