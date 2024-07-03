FROM node
COPY . /src
COPY package.json ./
WORKDIR /src
RUN npm install express
COPY . . 
EXPOSE 3001
CMD ["node", "index.js"]
