FROM node:14.17.1-alpine3.13
ENV PORT 3000
RUN apk add --no-cache libc6-compat
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g npm
COPY ./package*.json ./
RUN npm install


COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run start
