FROM node:12-alpine as node_cache

WORKDIR /app

COPY . /app

RUN yarn install && yarn build

FROM caddy:2.0.0

COPY --from=0 /app/Caddyfile /etc/Caddyfile

COPY --from=0 ./app/build /site

CMD ["caddy", "run", "--config", "./etc/Caddyfile"] 