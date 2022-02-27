// create an express server and configure it to run on port 3000
// by running the following command:
// npm run start

const express = require("express");

const app = express();
// const path = require("path");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

// app.use(express.static(path.join(__dirname, "public")));
app.use("/", usersRouter);
app.use("/", cardsRouter);

app.use((req, res) => res.status(404).send({ message: "Requested resource not found" }));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
