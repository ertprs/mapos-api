FROM node:lts-alpine
WORKDIR /app
ADD .env /app
ADD ace /app
EXPOSE ${PORT}
ADD package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]