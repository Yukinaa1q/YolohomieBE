const router = require("express").Router();
const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgres://yolohomiedata_user:dOzsLSGsIjpn6ETiRUz3hJZeV70KxxoD@dpg-con3gmocmk4c739u2gjg-a.singapore-postgres.render.com/yolohomiedata",
  ssl: { rejectUnauthorized: false },
});
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database", err)
  );
router.get("/temp", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT time,temperature FROM tmp_li_humi ORDER BY time asc LIMIT 20"
    );
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/humid", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT time,humidity FROM tmp_li_humi ORDER BY time asc LIMIT 20 "
    );
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/uv", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT time,light FROM tmp_li_humi ORDER BY time asc LIMIT 20"
    );
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/waterpump", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT datetime,light FROM tmp_li_humi ORDER BY time asc "
    );
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
