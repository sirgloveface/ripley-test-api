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
```
$ cd ripleytest/redis-server && docker-compose up --build
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