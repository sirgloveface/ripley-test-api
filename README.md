# Api Proyecto Ripley
 Api construida para exponer de forma rest consulta en redis coordenas(latitud, longitud) de los paises y luego consulta el servico de clima api rest [developer.forecast](https://developer.forecast.io/)
 y [darksky.net](https://darksky.net/dev) que son servidores de clima por regiones ubicadas por latitud y longitud

### Pre-requisitos 📋

## Starting Redis

```
... open shell linux
```
# redis-server

En caso de no tener servidor redis

1. Metodo 1:  
```
docker run -d -p 6379:6379 --name redis-server redis --bind 127.0.0.1
```
2. Metodo 2:  
```
$ cd ripley-test-api/redis-server && docker-compose up --build
```
Redis quedara corriendo por defecto en puerto 6379

## Development mode

Run `npm run start-dev` for a dev server. Navigate to `http://localhost:8000/`. The app will automatically reload if you change any of the source files.

# Usage

```
npm i
npm run start
http://localhost:8000/resetdataredis
```

# Reset datos cargado en redis

```
npm i
npm run start
Navigate to `http://localhost:8000/resetdataredis`. Este servicio reseteara datos cargados en redis.
Navigate to `http://localhost:8000/rediscleanall`. Este servicio reseteara datos cargados en redis async.
```


## Docker commands

# Build
```
docker build -t sir.gloveface/ripley-test-api:v1 .
```

# Run
```
docker run -p 8000:8000 -d sir.gloveface/ripley-test-api:v1
docker run --name ripley-test-api -p 8000:8000 -d sir.gloveface/ripley-test-api:v1
docker run -d --restart=always -p 8000:8000 sir.gloveface/ripley-test-api:v1
```

# Get container ID
```
docker ps -a
```

# Print app output
```
docker logs <container id>
docker logs -f <container id> -t
```

# Enter the container
```
docker exec -it <container id> /bin/bash
```

# test
```
curl -i localhost:8000
```


