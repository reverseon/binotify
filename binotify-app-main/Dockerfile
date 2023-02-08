FROM nginx:alpine AS server
COPY ./config/default.conf /etc/nginx/conf.d/
FROM php:fpm-alpine AS fpm
RUN apk add ffmpeg
RUN apk add postgresql-dev
RUN docker-php-ext-install pdo pdo_pgsql pgsql
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
FROM postgres:latest AS db
ADD ./db/dump.sql /docker-entrypoint-initdb.d/