const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test_user",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("user connection success");
});

const getUsers = async (req, res) => {
  try {
    connection.query("SELECT * FROM user", (err, result, fields) => {
      if (err) {
        res.status(400).send("errorr");
      }
      console.log(result);
      res.status(200).json({
        message: "success",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error" });
  }
};
const getUser = async (req, res) => {
  try {
    connection.query("SELECT * FROM user", (err, result, fields) => {
      if (err) {
        res.status(400).send("errorr");
      }
      console.log(result);
      res.status(200).json({
        message: "success",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error" });
  }
};
const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    connection.query(
      "INSERT INTO user(email,fullname,password) VALUES(?,?,?)",
      [email, fullname, password],
      (err, results, fields) => {
        if (err) {
          console.log("error inserting a user into database");
          return res.status(400).send();
        }
        return res.status(200).json({
          message: "new user successFullY",
          data: req.body,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

module.exports = {
  getUsers,
  createUser,
};
