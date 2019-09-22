FROM node:10.16.0-alpine

RUN mkdir -p /root/src/node
WORKDIR /root/src/node
ENV PATH /root/src/node/node_modules/.bin:$PATH

COPY . .

RUN yarn install

EXPOSE 3333

ENTRYPOINT ["yarn","run","dev"]