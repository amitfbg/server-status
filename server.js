const express = require("express");
const app = express();

app.use("/:statusCode", (req, res) => {
  let statusToSend = Number(req.params["statusCode"]) || 500;

  let sendData = "/serverError.html";

  if ([500, 501, 502, 503].includes(statusToSend)) {
    setTimeout(() => {
      res.status(statusToSend);
      res.sendFile(__dirname + sendData);
    }, 10000);
  } else {
    if ([200, 201, 202, 203].includes(statusToSend)) {
      sendData = "/success.html";
    } else if (statusToSend === 404) {
      sendData = "/notFound.html";
    } else if ([400, 401, 402, 403].includes(statusToSend)) {
      sendData = "/badRequest.html";
    } else {
      sendData = "/error.html";
    }
    res.status(statusToSend);
    res.sendFile(__dirname + sendData);
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
