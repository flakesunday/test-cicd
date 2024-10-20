const express = require("express");
const { getUsers, createUser } = require("../controller/useController");
const router = express();
router.use(express.json());

router.route("/users").get(getUsers).post(createUser);

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

module.exports = router;
