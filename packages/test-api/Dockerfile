FROM node:14
RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN yarn
CMD ["sh", "./build-and-run.sh"]
EXPOSE 9001