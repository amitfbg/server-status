const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/status/:statusCode", (req, res) => {
  let statusToSend = Number(req.params["statusCode"]) || 500;

  let sendData = "Server Error";

  if ([500, 501, 502, 503].includes(statusToSend)) {
    setTimeout(() => {
      res.status(statusToSend).send(sendData);
      res.end();
    }, 10000);
  } else {
    if ([200, 201, 202, 203].includes(statusToSend)) {
      sendData = "Loaded Successfully";
    } else if (statusToSend === 404) {
      sendData = "Not Found";
    } else if ([400, 401, 402, 403].includes(statusToSend)) {
      sendData = "Bad Request";
    } else {
      sendData = "Error";
    }
    res.status(statusToSend).send(sendData);
    res.end();
  }
});

// app.use(function (err, req, res, next) {
//   console.log(err.stack);
//   res.type("text/plain");
//   res.status(500);
//   res.send("500 Server Error");
// });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
