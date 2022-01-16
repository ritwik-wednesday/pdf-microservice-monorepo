FROM node:12
RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN yarn
RUN yarn build:dev
CMD yarn start
EXPOSE 9000