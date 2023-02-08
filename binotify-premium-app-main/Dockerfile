FROM node:alpine
WORKDIR /app
COPY ./build ./
RUN npm install -g serve
CMD ["serve", "-s", "-l", "3000", "."]