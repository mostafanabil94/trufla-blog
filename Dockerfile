FROM node:14

WORKDIR /trufla-blog
COPY package.json .
RUN npm install
COPY . .
CMD npm run start:dev