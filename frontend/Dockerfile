FROM node:20-alpine as build

WORKDIR /app
COPY . .

ARG WWWGROUP
ARG VITE_APP_BACKEND_ADDRESS
ENV VITE_APP_BACKEND_ADDRESS $VITE_APP_BACKEND_ADDRESS

RUN npm install
RUN npm run build

FROM ubuntu

ARG WWWGROUP

RUN apt-get update
RUN apt-get install nginx -y

RUN groupadd --force -g $WWWGROUP cdev
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 cdev

#COPY --from=build /app/dist /var/www/html/
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx","-g","daemon off;"]
