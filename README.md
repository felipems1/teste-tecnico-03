# Teste Tecnico 

API para gerencia lugares (CRUD).

## Tecnologias
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- Docker
- Zod
- Zod-validation-error
- Supertest
- Vitest
- Bcryptjs
- Passport-jwt
- ESLint

## Configuração

Você precisa ter o [Git](https://git-scm.com/) e algum gerenciador de pacotes([NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) | [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)) instalados. Além disso, para rodar a aplicação é necessário que você tenha o [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) em sua máquina.

### Preparando o ambiente

```bash
1. Clone o repositório:
$ git clone https://github.com/felipems1/teste-tecnico.git

2. Acesse a pasta e instale as dependências via terminal:
$ yarn / npm i
```

#### Defina as variáveis de ambiente
```bash
1. Renomeie o arquivo
	.env.example -> .env

2. Substitua os <valores>
  DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database-name>?schema=public"

  JWT_SECRET=<secret>

  POSTGRES_USER=<username>
  POSTGRES_PASSWORD=<password>
  POSTGRES_DB=<database-name>
```

### Rodando a aplicação

```bash
1. Inicie a aplicação em modo de desenvolvimento:
$ docker-compose up

2. O servidor será aberto em http://localhost:3333
```

## Endpoints

### User

#### Request

`POST /accounts`

    curl -i -H 'Accept: application/json' -X POST -d '{"username": "example", "password": "example"}' http://localhost:3333/accounts

#### Response

    HTTP/1.1 201 OK
		Date: Fri, 27 Oct 2023 17:05:20 GMT
		Status: 200 OK
		Connection: close
		RateLimit-Limit: 30
		RateLimit-Remaining: 29
		Content-Type: application/json

##

#### Request

`POST /sessions`

    curl -i -H 'Accept: application/json' -X POST -d '{"username": "example" "password": "example"}' http://localhost:3333/sessions

#### Response

  	HTTP/1.1 200 OK
		Date: Fri, 27 Oct 2023 17:10:20 GMT
		Status: 200 OK
		Connection: close
		RateLimit-Limit: 30
		RateLimit-Remaining: 28
		Content-Type: application/json

```js
		{
  			"access_token": "token_example"
		}
```

##

### Location

#### Request

`POST /locations`

    curl -i -H 'Accept: application/json' -H 'Authorization: Bearer token' -X POST -d '{"name": "example", "city": "example", "state": "example"}' http://localhost:3333/location


#### Response

    HTTP/1.1 200 OK
		Date: Fri, 27 Oct 2023 17:15:20 GMT
		Status: 200 OK
		Connection: close
		RateLimit-Limit: 30
		RateLimit-Remaining: 27
		Content-Type: application/json

##

#### Request

`PUT /locations?id=locationId`

    curl -i -H 'Accept: application/json' -H 'Authorization: Bearer token' -X PUT -d '{"name": "example", "city": "example", "state": "example"}' http://localhost:3333/locations?id=locationId

#### Response

    HTTP/1.1 200 OK
		Date: Fri, 27 Oct 2023 17:20:20 GMT
		Status: 200 OK
		Connection: close
		RateLimit-Limit: 30
		RateLimit-Remaining: 26
		Content-Type: application/json

```js
{
  "name": "Nome atualizado",
  "city": "Cidade atualizada",
  "state": "Estado atualizado"
}
```

##

#### Request

`DELETE /locations?id=locationId`

    curl -i -H 'Accept: application/json' -H 'Authorization: Bearer token' -X DELETE  http://localhost:3333/locations?id=locationId

#### Response

    HTTP/1.1 204 No Content
		Date: Fri, 27 Oct 2023 17:25:20 GMT
		Status: 204 No Content
		Connection: close

##

#### Request

`GET /locations`

		curl -i -H 'Accept: application/json' -H 'Authorization: Bearer token' -X GET http://localhost:3333/locations

`GET /locations?name=example`

    curl -i -H 'Accept: application/json' -H 'Authorization: Bearer token' -X GET http://localhost:3333/locations?name=example

#### Response

    HTTP/1.1 204 No Content
		Date: Fri, 27 Oct 2023 17:25:20 GMT
		Status: 204 No Content
		Connection: close

```js
[
	{
		"id": "0434e127-4b1a-48f5-a62b-5fbfe296eb95",
		"name": "praia bessa",
		"city": "joão pessoa",
		"state": "paraiba",
		"createdAt": "2024-01-10T18:28:23.099Z",
		"updatedAt": "2024-01-10T18:28:23.099Z"
	}
]
```