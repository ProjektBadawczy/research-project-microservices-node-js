FROM node:16

WORKDIR /usr/src/app

EXPOSE 80

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

COPY . .

RUN npm install

RUN npm install -g nodemon

CMD ["nodemon", "index.ts"]