const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("user connection success");
});

const getUsers = async (req, res) => {
  try {
    connection.query("SELECT * FROM student", (err, result, fields) => {
      if (err) {
        console.log("err", err);
        res.status(400).json({ message: "failed" });
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
    connection.query(
      "SELECT * FROM student WHERE student.student_id = " + req.params.id,
      [req.params.id],
      (err, result, fields) => {
        if (err) {
          console.log("err", err);
          res.status(400).json({ message: "failed" });
        }
        console.log(result);
        res.status(200).json({
          message: "success",
          data: result,
        });
      }
    );
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: "error" });
  }
};
const createUser = async (req, res) => {
  const { first_name, last_name, email, major_id } = req.body;
  console.log("mybody");
  try {
    connection.query(
      "INSERT INTO student(first_name,last_name,email,major_id) VALUES(?,?,?,?)",
      [first_name, last_name, email, major_id],
      (err, results, fields) => {
        if (err) {
          console.log("error inserting a user into database");
          console.log(err);
          return res.status(400).end();
        }
        return res.status(200).json({
          message: "new student successFullY",
          data: req.body,
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};
const editUser = async (req, res) => {
  console.log(req.params.id);
  var user = { id: req.params.id };
  const { first_name, last_name, email, major_id } = req.body;
  try {
    connection.query(
      "UPDATE student SET first_name = ?, last_name = ?, email = ?, major_id = ? WHERE student.student_id = " +
        req.params.id,
      [first_name, last_name, email, major_id, req.params.id],

      (err, results, fields) => {
        if (err) {
          console.log("error inserting a user into database");
          console.log(err);
          return res.status(400).json({ message: "fail" });
        }
        console.log(results);
        return res.status(200).json({
          message: "update student successFullY",
        });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error" });
  }
};
const deleteUser = async (req, res) => {
  var user = { id: req.params.id };
  try {
    connection.query(
      "DELETE FROM student WHERE student.student_id = " + req.params.id,
      user,
      (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "fail" });
        }
        res.status(200).json({
          message: "deleted student ",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
app.get("/students", getUsers);
app.get("/students/:id", getUser);
app.post("/createStudent", createUser);
app.patch("/editStudent/:id", editUser);
app.delete("/deleteStudent/:id", deleteUser);
app.listen(3000, () => {
  console.log("run server at port 3000");
});
