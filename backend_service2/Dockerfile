FROM node
COPY . /src
COPY package.json ./
WORKDIR /src
RUN npm install express
COPY . . 
EXPOSE 3002
CMD ["node", "index.js"]
