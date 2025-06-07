FROM node:20.7.0-alpine AS builder

RUN apk update && apk upgrade && \
    apk add --no-cache tzdata wget curl

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20.7.0-alpine AS final

WORKDIR /app

COPY --from=builder /app .

ENV DOCKER_ENV=true

CMD [ "node", "./dist/src/app.js" ]
