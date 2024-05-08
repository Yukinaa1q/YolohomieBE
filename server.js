const express = require("express");

const { publishMessage } = require("./mqttFunc/publisher");
const app = express();
require("dotenv").config();
const controlRoute = require("./api/controllFunction.js");

app.use(express.json());

// Express route to publish message to MQTT broker
app.post("/publish/topic/message", (req, res) => {
  const { topic, message } = req.body;
  console.log("publish Api");
  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }

  // Publish the message
  publishMessage(topic, message);

  res.json({ message: "Message published successfully" });
});
app.use("/", controlRoute);
// Start Express server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
