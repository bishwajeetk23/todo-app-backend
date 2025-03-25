FROM node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 8000

CMD [ "npm","run","start" ]