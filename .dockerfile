FROM node:10.16.0-alpine as builder

RUN apk update
RUN apk add --no-cache \
    build-base bash python linux-headers zlib-dev

RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

FROM node:10.16.0-alpine

RUN apk update
RUN apk add --no-cache \
    build-base bash python linux-headers zlib-dev

WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

COPY --from=builder /root/src/app/package.json /root/src/app/package.json
COPY --from=builder /root/src/app/yarn.lock /root/src/app/yarn.lock
COPY --from=builder /root/src/app/.env /root/src/app/.env

RUN yarn install

COPY --from=builder /root/src/app/dist /root/src/app/dist

EXPOSE 3333

ENTRYPOINT ["node","./dist/app.js"]

# docker build -t counter-be . -f ./.dockerfile
# docker run -d --name counter-be -p 3333:3333 counter-be:latest