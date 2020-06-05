FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN yarn install && yarn run build

FROM nginx

COPY --from=0 ./app/build /usr/share/nginx/html

COPY --from=0 ./app/nginx.conf /etc/nginx/nginx.conf

COPY ["ssl", "/etc/nginx/ssl"]

WORKDIR /usr/share/nginx/html