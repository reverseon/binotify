FROM node:19-alpine
WORKDIR /rest-api
COPY package*.json ./
RUN npm ci --only=production
COPY ./src ./src
COPY ./server.js ./server.js
EXPOSE 3001
CMD ["npm", "run", "start"]