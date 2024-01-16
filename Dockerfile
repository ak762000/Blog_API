FROM node:alpine

WORKDIR /usr/src

# Install necessary build dependencies
RUN apk --no-cache add \
    python3 \
    make \
    g++ \
    && npm install -g node-pre-gyp

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
# Your remaining Dockerfile commands...
CMD ["npm","start"]