FROM node:16

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
