const app = require("./route/userRoute");
const mysql = require("mysql");

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
