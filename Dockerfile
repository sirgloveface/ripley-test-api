FROM node
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update
RUN apt install nano
# Install app dependencies
COPY . /usr/src/app/
RUN npm i
RUN npm i pm2 -g
# Copy app source
COPY src /usr/src/app/src
RUN npm run build
# Create the default data directory
RUN mkdir -p /data/db

EXPOSE 8000

CMD ["pm2", "start", "process.json", "--no-daemon"]
