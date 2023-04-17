FROM node:latest as react-build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .


RUN npm run build

FROM nginx:latest

COPY --from=react-build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]