FROM node:20.11.0-alpine

WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["npm", "start"]
