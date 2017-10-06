FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
COPY package.json /usr/src/
RUN npm install --production

# Bundle app source
COPY . /usr/src

CMD [ "npm","start" ]