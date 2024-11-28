# ecommerce-microservice

## Comment lancer le projet ?

```bash
docker-compose -f docker-compose-dev.yml --env-file .env.dev up -d
```

Remplissez les .env comme indiqués selon les .env.sample

## Comment tester l'API ?

**Avec Bruno :**

Importez dans Bruno le dossier ECOMMERCE-API

Ensuite testez l'api !

**Avec Postman :**

Testez les routes de l'API comme indiqué dans la doc swagger 

```bash
http://localhost:<port>/api-docs
```

## Notre Stack technique

- NodeJS
- Express
- PostgreSQL
- Docker
- Neon
- Prisma

