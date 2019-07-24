# Map-OS API

<div align="center">
  <img src="https://github.com/map-os/mapos-api/blob/master/docs/lgkolqucok_45785045302.png?raw=true" width="600px">
</div>

---
This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Validator

## Setup

Use the adonis command to install the blueprint

```bash
npm install
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
adonis seed
```

### Running

```bash
adonis serve --dev -e graphql
```


<div align="center">
  <img src="https://github.com/map-os/mapos-api/blob/master/docs/graphiql.png?raw=true" width="100%">
</div>
