FROM node:14-alpine

WORKDIR /sdcapi

COPY package.json /sdcapi

RUN npm install

COPY . /sdcapi

EXPOSE 4000

CMD npm install && exec npm start
