FROM node:20.11.0-alpine AS build

WORKDIR /client

COPY package*.json ./


RUN npm install
RUN npm run build

FROM nginx:1.25.3-alpine
COPY --from=build /client/build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]


