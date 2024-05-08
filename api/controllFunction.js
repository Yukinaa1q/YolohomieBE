const router = require("express").Router();
const fs = require("fs");

router.post("/lightControl", async (req, res) => {
  const { signal } = req.body;
  const status = JSON.parse(fs.readFileSync("statusfile.json"));

  try {
    let light = parseInt(signal);

    if (light == 11) {
      console.log("helo");
      // status.light1 = light;
      // fs.writeFileSync(
      //   "statusfile.json",
      //   JSON.stringify(status, null, 2),
      //   (err) => {
      //     if (err) {
      //       res.status(500).json({ error: err.message });
      //     } else {
      //       res.json({ message: "Light 1 has turned on", light: 1 });
      //     }
      //   }
      // );
    } else if (light == 12) {
      status.light2 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 2 has turned on", light: 2 });
    } else if (light == 13) {
      status.light3 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 3 has turned on", light: 3 });
    } else if (light == 14) {
      status.light4 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 4 has turned on", light: 4 });
    } else if (light == 21) {
      status.light1 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 1 has turned off", light: 1 });
    } else if (light == 22) {
      status.light2 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 2 has turned off", light: 2 });
    } else if (light == 23) {
      status.light3 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 3 has turned off", light: 3 });
    } else if (light == 24) {
      status.light4 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 4 has turned off", light: 4 });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/lightControl", async (req, res) => {
  const status = JSON.parse(fs.readFileSync("statusfile.json"));

  try {
    res.json({ signalLight: status });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/fanControl", async (req, res) => {
  const { signal } = req.body;
  try {
    fan = parseInt(signal);
    if (fan == 40) {
      res.json({ message: "Fan has turned off  " });
    } else if (fan == 425) {
      res.json({ message: "Fan has turned on at 25%" });
    } else if (fan == 450) {
      res.json({ message: "Fan has turned on at 50%" });
    } else if (fan == 475) {
      res.json({ message: "Fan has turned on at 75%" });
    } else if (fan == 4100) {
      res.json({ message: "Fan has turned on at 100%" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/fanControl", async (req, res) => {
  try {
    res.json({ signalFan: String(fan) });
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.post("/doorControl", async (req, res) => {
  const { signal } = req.body;
  try {
    door = parseInt(signal);
    if (door == 31) {
      res.json({ message: "Door is closing" });
    } else if (door == 32) {
      res.json({ message: "Door is opening" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/doorControl", async (req, res) => {
  try {
    res.json({ signalFan: String(door) });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
