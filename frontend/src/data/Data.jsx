const express = require("express");
const mysql = require("mysql");

const SignUp = express();
SignUp.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "LoginSystem",
});

SignUp.listen(3000, () => {
  console.log("running server");
});
