# backend-trips

Backend de la mini app de trips escrita en express y mongo utilizando una arquitectura hexagonal,
la base de datos se inicializa la primera vez que se corre la api

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm start:dev
```

### Compile for Production

```sh
pnpm build
```

### Run Unit Tests with [Jest](https://jestjs.io/)

```sh
pnpm test
```

### Run integration tests

me hubiera encantado tener tiempo de agregar test de integraciones, queria levantar el docker compose
y hacer los test directo a los endpoints.

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Docker y Docker compose

antes de correr, se debe crear un archivo vacio .env.local en la raiz.

para correr todo solo es necesario correr:
```sh
docker compose up
```
esto levantara la bd, el back y el front.
para correr los contenedores en modo desarrollo con hot reload se debe descomentar el target tanto en 
la api y el front:

por ejemplo para la api pasaria de:

```sh
  trips-api:
    ports: 
      - 8000:3000
    env_file:
      - .env.local
    build:
      context: ./
      # target: dev
    volumes:
      - ./src:/workspace/src
    restart: always
    depends_on:
      - mongo
```

```sh
  trips-api:
    ports: 
      - 8000:3000
    env_file:
      - .env.local
    build:
      context: ./
      target: dev
    volumes:
      - ./src:/workspace/src
    restart: always
    depends_on:
      - mongo
```
y luego rebuildear el servicio

```sh
docker compose up --build trips-api
```

se recomienda correr el docker compose del repositorio del backend y dejar los dos repositorios juntos para 
que se pueda encontrar el repo del front desde el docker compose. es decir:

```
frontend-trips/
backend-trip/
```

cuando se termine el build, deberia estar la pagina en [localhost:5173](http://localhost:5173)
