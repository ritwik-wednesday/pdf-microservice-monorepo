## Setup

### Copilot

```
copilot init -a "pdf-microservice" -t "Load Balanced Web Service" -n "pdf-microservice-dev-svc" -d ./Dockerfile
copilot env init --name dev --profile default --default-config
copilot deploy --name "pdf-microservice-dev-svc" -e "dev"
```

### Build and run docker container locally

```
docker-compose down
docker-compose build
docker-compose up
```

### Develop locally

```
yarn start:local
```

### Start dev server

```
yarn dev
```

### Start prod server

```
yarn prod
```

### Build the application

```
yarn build
```
