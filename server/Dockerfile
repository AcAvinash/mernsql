FROM node:20.11.0-alpine

WORKDIR /backend

COPY server/package*.json ./


RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]

