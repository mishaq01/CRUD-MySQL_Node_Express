import express from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    Credential: true,
    origin: "*",
  })
);

app.use(express.json());

const connection = mysql.createConnection({
  host: "db4free.net",
  user: "vcentry",
  password: "test@123",
  database: "travelix",
  port: 3306,
});

connection.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("MySQL has been connected successfully...");
  }
});

app.post("/api/create/record", (request, response) => {
  const incomingData = request.body;
  const age = parseInt(incomingData.age);

  const sql_query = `INSERT INTO mr_beast (username, email, age, location) VALUES 
  ('${incomingData.username}', '${incomingData.email}', ${age}, '${incomingData.location}')`;

  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(result);
    }
  });
});

app.get("/api/read/record", (request, response) => {
  const sql_query = `SELECT * FROM mr_beast`;

  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(result);
    }
  });
});

app.put("/api/update/record/:id", (request, response) => {
  const incomingData = request.body;
  const incomingId = request.params.id;

  const age = parseInt(incomingData.age);

  const sql_query = `UPDATE mr_beast SET username='${incomingData.username}', 
  email='${incomingData.email}', age=${age}, location='${incomingData.location}' WHERE id=${incomingId}`;

  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(result);
    }
  });
});

app.delete("/api/delete/record/:id", (request, response) => {
  const incomingId = request.params.id;

  const sql_query = `DELETE FROM mr_beast WHERE id=${incomingId}`;

  connection.query(sql_query, (error, result) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.status(200).send(result);
    }
  });
});

const portNumber = process.env.PORT || 5000;
server.listen(portNumber, () => {
  console.log("NodeJS project is running...");
});
