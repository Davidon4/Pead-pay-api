const express = require("express");
const app = express();
const port = 5000;
const Treblle = require("@treblle/express");

// Initializing the Treblle Sdk as a global instance
app.use(Treblle());

app.get("/", (req, res) => {
  res.send("Welcome to PEAD-PAY Payment Server");
});

app.use("/api/v1/payment", require("./Routes/Payment"));
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});