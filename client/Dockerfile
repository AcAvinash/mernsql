FROM node:20.11.0-alpine

WORKDIR /frontend

COPY package.json .
COPY package-lock.json .  

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]


