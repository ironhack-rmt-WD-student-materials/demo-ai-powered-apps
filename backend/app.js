require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


// 👇 Start handling routes here
app.use("/api", require("./routes/index"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/api", isAuthenticated, require("./routes/recipe.routes"));

require("./error-handling")(app);

module.exports = app;
