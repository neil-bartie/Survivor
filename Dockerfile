FROM node:18-alpine3.15

WORKDIR /app

COPY package.json package-lock.json ./

COPY ./src ./src

RUN npm i --omit=dev
 
EXPOSE 8080

CMD [ "npm", "start" ]