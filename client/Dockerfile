FROM node:20.11.0-alpine AS build

WORKDIR /app

COPY package*.json ./


RUN npm install
RUN npm run build

FROM nginx:1.25.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]


