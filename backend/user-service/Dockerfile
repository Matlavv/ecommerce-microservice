FROM node:20 AS builder

WORKDIR /app

COPY package.json .

RUN npm install --strict-ssl=false
RUN npm run build

RUN rm 
