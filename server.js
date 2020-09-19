const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const items = require("./routes/api/items");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//DB Config
const db = require("./config/keys").mongoURI;
//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//Use Routes
app.use("/api/items", items);

// Server static assetsgit if in production
if (process.env.NODE_ENV === "production") {
  //set Static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`****** Listening : ${PORT} ******`);
});
