<h1 align="left">Projeto Car Shop</h1>

###

<p align="left">Neste projeto foi criada uma API CRUD para uma concessionária de veículos com um banco de dados MongoDB.<br><br>Para o desenvolvimento da API foi utilizado o ODM Mongoose para fazer a conexão do banco de dados com o Node.js. <br><br>O projeto utiliza a arquitetura MSC (Model-Service-Controller), Orientação a Objetos seguindo os princípios SOLID com TypeScript e testes unitários feitos com Mocha, Chai e Sinon, que fazem cobertura de 100% das linhas de código do projeto.</p>

###

<h2 align="left">Tecnologias utilizadas</h2>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="50" width="62" alt="nodejs logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="50" width="62" alt="typescript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="50" width="62" alt="express logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="50" width="62" alt="mongodb logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" height="50" width="62" alt="mocha logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" height="50" width="62" alt="docker logo"  />
</div>

###

<h2 align="left">Como utilizar a aplicação</h2>

Faça o clone da aplicação usando o comando `git clone`. Após isso, entre na pasta do projeto utilizando o comando `cd car-shop`.

###

<details>
  <summary>
    <strong>🐳 Rodando pelo Docker</strong>
  </summary><br>

  - Dentro da pasta do projeto, utilize o comando `docker-compose up -d`. Ele é o responsável por subir a API do Node.js e o banco de dados MongoDB.
  - Entre no terminal do container através do comando `docker exec -it car_shop bash`.
  - Dentro do container, instale as dependências necessárias através do comando `npm install`.
  - Por fim, ainda dentro do terminal do container, para inicializar a API, utilize o comando `npm run dev`.
  > A API se encontra na porta `3001` do localhost.


</details>

<details>
  <summary>
    <strong>Rodando localmente</strong>
  </summary><br>

  - Dentro da pasta do projeto, utilize o comando `npm install` para instalar as dependências necessárias.
  - Coloque a URI do MongoDB no arquivo `./src/models/connection.ts` na variável `MONGO_DB_URL`.
  - Utilize o comando `npm run dev` para inicializar a API.
  > A API se encontra na porta `3001` do localhost.


</details>

###

<h2 align="left">Testes unitários e cobertura de testes</h2>

- Para rodar os testes unitários, utilize o comando `npm run test:dev`.
- Para verificar a cobertura dos testes, utilize o comando `npm run test:coverage`.

###

<h2 align="left">Endpoints</h2>

<h3 align="left">Cars</h3>

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Adiciona um carro  | http://localhost:3001/cars |
| `GET` |  Lista todos os carros  | http://localhost:3001/cars |
| `GET` |  Lista um carro com base em seu _id  | http://localhost:3001/cars/:id |
| `PUT` |  Atualiza dados de um carro com base em seu _id  | http://localhost:3001/cars/:id |
| `DELETE` |  Deleta um carro com base em seu _id  | http://localhost:3001/cars/:id |

#### Os endpoints `POST` e `PUT` necessitam de um objeto JSON no seguinte formato:

```
{
  model: "Ferrari Maranello", 
  year: 1963, 
  color: "red",
  buyValue: 3500000,
  status: true,
  seatsQty: 2,
  doorsQty: 2
}
```

- Sobre as propriedades do objeto acima, é importante saber:

```
{
  model: String com pelo menos 3 caracteres
  year: Número maior ou igual 1900 e menor ou igual 2022
  color: String com pelo menos 3 caracteres
  buyValue: Número inteiro
  status: Propriedade opcional, indica se o carro pode ou não ser comprado (booleano)
  seatsQty: Número maior ou igual 2 e menor ou igual 7
  doorsQty: Número maior ou igual 2 e menor ou igual 4
}
```

###

<h3 align="left">Motorcycles</h3>

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Adiciona uma motocicleta  | http://localhost:3001/motorcycles
| `GET` |  Lista todas as motocicletas  | http://localhost:3001/motorcycles |
| `GET` |  Lista uma motocicleta com base em seu _id  | http://localhost:3001/motorcycles/:id |
| `PUT` |  Atualiza dados de uma motocicleta com base em seu _id  | http://localhost:3001/motorcycles/:id |
| `DELETE` |  Deleta uma motocicleta com base em seu _id  | http://localhost:3001/motorcycles/:id |

#### Os endpoints `POST` e `PUT` necessitam de um objeto JSON no seguinte formato:

```
{
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  status: false
  category: "Street",
  engineCapacity: 125
}
```

- Sobre as propriedades do objeto acima, é importante saber:

```
{
  model: String com pelo menos 3 caracteres
  year: Número maior ou igual 1900 e menor ou igual 2022
  color: String com pelo menos 3 caracteres
  buyValue: Número inteiro
  status: Propriedade opcional, indica se o carro pode ou não ser comprado (booleano)
  category: String que só aceita os valores Street, Custom ou Trail
  engineCapacity: Número maior que 0 e menor ou igual 2500
}
```


