const express = require("express");
const compression = require("compression");
const app = express();
const mongoose = require("mongoose");
const treblle = require("@treblle/express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const logger = require("./utils/logger");
const port = 5000;

const userRoutes = require("./routes/users");
const paymentRoutes = require("./routes/payments");
// Compression middleware is used to compress the response bodies before sending them to the client.
app.use(compression());

app.use(cors());
app.options("*", cors());

// Initializing the Treblle Sdk as a global instance
app.use(
  treblle({
    apiKey: process.env.TREBLLE_API_KEY,
    projectId: process.env.TREBLLE_PROJECT_ID,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to PEAD-PAY Payment Server");
});

app.use(`/api/v1/auth/`, userRoutes);

app.use(`/api/v1/payment/`, paymentRoutes);

/* Connecting to the database. */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Pead-api-db",
  })
  .then(() => logger.info("Database Connection is ready..."))
  .catch((err) => logger.error("DB CONNECTION ERROR: ", err));

/* Listening to the port 5000 and printing the api and the server is running on port 5000. */
app.listen(5000, () => {
  logger.info(`server is running ${port}`);
});
