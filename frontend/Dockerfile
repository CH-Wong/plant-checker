FROM node:16.15.1-alpine
WORKDIR /app/
COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000