FROM node:20.11.0-alpine

WORKDIR /client

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


FROM nginx:1.25.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]