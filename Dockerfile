FROM node:16-alpine

WORKDIR /app

COPY dist/ ./dist

WORKDIR /app/server
COPY server/package.json ./

RUN npm install 
COPY server/* ./

EXPOSE 8080/tcp
EXPOSE 8080/udp

CMD ["node", "index.js"]
