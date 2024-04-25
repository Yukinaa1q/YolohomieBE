const express = require("express");
const mqtt = require("mqtt");
const app = express();
require("dotenv").config();
// MQTT broker connection options
const mqttOptions = {
  host: "mqtt.ohstem.vn",
  port: 1883,
  username: "thinhdadn",
  password: "hehe",
};
app.use(express.json());
// Connect to MQTT broker
const client = mqtt.connect(mqttOptions);

// Handle MQTT connection
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  const topics = [
    "thinhdadn/feeds/V2/humidity",
    "thinhdadn/feeds/V2/temperature",
    "thinhdadn/feeds/V2/sun",
    "thinhdadn/feeds/V2/door",
    "thinhdadn/feeds/V2/lights",
    "thinhdadn/feeds/V2/fan",
  ];

  client.subscribe(topics, (err) => {
    if (err) {
      console.error("Error subscribing to topic:", err);
    } else {
      console.log("Subscribed to topic: ", topics.join(","));
    }
  });
});

// Handle MQTT message reception
client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  switch (topic) {
    case "thinhdadn/feeds/V2/lights":
      // Handle messages for the "light" topic
      if (message.toString() === "11") {
        // Turn on a device or perform any other action
        console.log("Turning on LED 1...");
      } else if (message.toString() === "12") {
        console.log("Turning on LED 2...");
      } else if (message.toString() === "13") {
        console.log("Turning on LED 3...");
      } else if (message.toString() === "14") {
        console.log("Turning on LED 4...");
      } else if (message.toString() === "21") {
        console.log("Turning off LED 1...");
      } else if (message.toString() === "22") {
        console.log("Turning off LED 2...");
      } else if (message.toString() === "23") {
        console.log("Turning off LED 3...");
      } else if (message.toString() === "24") {
        console.log("Turning off LED 4...");
      } else {
        // Handle other message content
        console.log(
          "Received message with unrecognized content:",
          message.toString()
        );
      }
      break;
    case "thinhdadn/feeds/V2/temperature":
      // Handle messages for the "temperature" topic

      break;
    case "thinhdadn/feeds/V2/humidity":
      // Handle messages for the "humidity" topic
      break;
    // Add cases for other topics as needed
    case "thinhdadn/feeds/V2/sun":
      break;

    case "thinhdadn/feeds/V2/door":
      if (message.toString() === "31") {
        // Turn on a device or perform any other action
        console.log("Open the door...");
      } else if (message.toString() === "32") {
        console.log("Close the door...");
      } else {
        console.log(
          "Received message with unrecognized content:",
          message.toString()
        );
      }
      break;

    case "thinhdadn/feeds/V2/fan":
      if (message.toString() === "40") {
        // Turn on a device or perform any other action
        console.log("Turing off the fan...");
      } else if (message.toString() === "425") {
        console.log("Turning on the fan at 25% speed...");
      } else if (message.toString() === "450") {
        console.log("Turning on the fan at 50% speed...");
      } else if (message.toString() === "475") {
        console.log("Turning on the fan at 75% speed...");
      } else if (message.toString() === "4100") {
        console.log("Turning on the fan at max speed...");
      } else {
        console.log(
          "Received message with unrecognized content:",
          message.toString()
        );
      }
      break;

    default:
      // Handle messages for unrecognized topics
      console.log("Received message on unrecognized topic:", topic);
      break;
  }
});
// Express route to publish message to MQTT broker
app.post("/publish/topic/message", (req, res) => {
  const { topic, message } = req.body;
  client.publish(topic, message, (err) => {
    if (err) {
      console.error("Error publishing message:", err);
      res.status(500).send("Error publishing message");
    } else {
      console.log("Message published successfully");
      res.send("Message published successfully");
    }
  });
});

// Start Express server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
