FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN mv prisma/generated.ts prisma/seed.ts

RUN npx prisma generate
