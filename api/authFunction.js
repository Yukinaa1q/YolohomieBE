const router = require("express").Router();
const crypto = require("crypto");
const { Client } = require("pg");
const hashpass = (password) => {
  const hash = crypto.createHash("sha256");

  // Update the hash with the password
  hash.update(password);

  // Convert the hash to a hexadecimal string and return it
  return hash.digest("hex");
};
const client1 = new Client({
  connectionString:
    "postgres://yolohomiedata_user:dOzsLSGsIjpn6ETiRUz3hJZeV70KxxoD@dpg-con3gmocmk4c739u2gjg-a.singapore-postgres.render.com/yolohomiedata",
  ssl: { rejectUnauthorized: false },
});
client1
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database", err)
  );
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedpass = hashpass(password);
    const result = await client1.query(
      "SELECT email,password FROM yolohome_user WHERE email = $1 AND password = $2",
      [email, hashedpass]
    );
    console.log(result.rows);
    if (result.rows != 0) {
      res
        .status(200)
        .json({ message: "Successfully logged in", success: true });
    } else {
      res.json({ message: "Wrong username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
