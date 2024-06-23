FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["sh", "-c", "serve -s dist -l $PORT"]
