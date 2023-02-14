<h1 align="left">Car Shop</h1>

###

<p align="left">In this project, a CRUD API was created for a car dealership with a MongoDB database.<br><br>For the development of the API, ODM Mongoose was used to connect the database with Node.js . <br><br>The project uses the MSC (Model-Service-Controller) architecture, Object Orientation following the SOLID principles with TypeScript and unit tests made with Mocha, Chai and Sinon, which cover 100% of the lines of code from the project.</p> 

###

<h2 align="left">Technologies used</h2>

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

<h2 align="left">How to use the application</h2>

Clone the application using the `git clone` command. After that, enter the project folder using the `cd car-shop` command.

###

<details>
  <summary>
    <strong>🐳 Running through Docker</strong>
  </summary><br>

  - Inside the project folder, use the `docker-compose up -d` command. It is responsible for uploading the Node.js API and the MongoDB database.
  - Enter the container's terminal via the `docker exec -it car_shop bash` command.
  - Inside the container, install the necessary dependencies using the `npm install` command.
  - Finally, still inside the container's terminal, to initialize the API, use the `npm run dev` command.
  > The API is on port `3001` on localhost.


</details>

<details>
  <summary>
    <strong>Running locally</strong>
  </summary><br>

  - Inside the project folder, use the `npm install` command to install the necessary dependencies.
  - Put the MongoDB URI in the `./src/models/connection.ts` file in the `MONGO_DB_URL` variable.
  - Use the `npm run dev` command to initialize the API.
  > The API is on port `3001` on localhost.


</details>

###

<h2 align="left">Unit tests and test coverage</h2>

- To run the unit tests, use the `npm run test:dev` command.
- To verify test coverage, use the `npm run test:coverage` command.

###

<h2 align="left">Endpoints</h2>

<h3 align="left">Cars</h3>

| Method | Functionality | URL |
|---|---|---|
| `POST` | Create new car  | http://localhost:3001/cars |
| `GET` |  List all cars  | http://localhost:3001/cars |
| `GET` |  List a car based on its _id  | http://localhost:3001/cars/:id |
| `PUT` |  Update a car based on its _id  | http://localhost:3001/cars/:id |
| `DELETE` | Delete a car based on its _id  | http://localhost:3001/cars/:id |

#### The `POST` and `PUT` endpoints require a JSON object in the following format:

```JavaScript
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

- About the properties of the above object, it is important to know:

```JavaScript
{
  model: String with at least 3 characters
  year: Number greater than or equal to 1900 and less than or equal to 2022
  color: String with at least 3 characters
  buyValue: Integer
  status: Optional property, indicates whether or not the car can be purchased (boolean)
  seatsQty: Number greater than or equal to 2 and less than or equal to 7
  doorsQty: Number greater than or equal to 2 and less than or equal to 4
}
```

###

<h3 align="left">Motorcycles</h3>

| Method | Funcionality | URL |
|---|---|---|
| `POST` | Create new motorcycle | http://localhost:3001/motorcycles
| `GET` |  List all motorcycles  | http://localhost:3001/motorcycles |
| `GET` |  List a motorcycle based on its _id  | http://localhost:3001/motorcycles/:id |
| `PUT` |  Update a motorcycle based on its _id  | http://localhost:3001/motorcycles/:id |
| `DELETE` |  Delete a motorcycle based on its _id  | http://localhost:3001/motorcycles/:id |

#### The `POST` and `PUT` endpoints require a JSON object in the following format:

```JavaScript
{
  model: "Honda Biz",
  year: 2022,
  color: "red",
  buyValue: 3500,
  status: false,
  category: "Street",
  engineCapacity: 125
}
```

- About the properties of the above object, it is important to know:

```JavaScript
{
  model: String with at least 3 characters
  year: Number greater than or equal to 1900 and less than or equal to 2022
  color: String with at least 3 characters
  buyValue: Integer
  status: Optional property, indicates whether or not the motorcycle can be purchased (boolean)
  category: String that only accepts the values Street, Custom or Trail
  engineCapacity: Number greater than 0 and less than or equal to 2500
}
```


