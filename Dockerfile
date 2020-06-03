# FROM node:12-alpine as node_cache

# WORKDIR /app

# COPY . /app

# RUN yarn install && yarn build

# FROM caddy:2.0.0

# COPY --from=0 /app/Caddyfile /etc/Caddyfile

# COPY --from=0 ./app/build /site

# EXPOSE 80/tcp

# EXPOSE 8080/tcp

# EXPOSE 443/tcp

# CMD ["caddy", "run", "--config", "./etc/Caddyfile"] 


FROM node:12-alpine

# ENV NODE_ENV=production

WORKDIR /app

COPY . /app

RUN yarn install && yarn run build

FROM nginx

COPY --from=0 ./app/build /usr/share/nginx/html

COPY --from=0 ./app/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html