// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const UNIVERSE_ID = "9140307415";
const OPEN_CLOUD_API_KEY = process.env.ROBLOX_API_KEY; // dari Creator Dashboard
const TOPIC = "SaweriaDonation";

app.post("/webhook/saweria", async (req, res) => {
  const { donator_name, amount_raw, message } = req.body;

  // Format pesan yang dikirim ke Roblox
  const payload = {
    message: JSON.stringify({
      donator: donator_name,
      amount: amount_raw,
      note: message || "",
    }),
  };

  try {
    const r = await fetch(
      `https://apis.roblox.com/messaging-service/v1/universes/${UNIVERSE_ID}/topics/${TOPIC}`,
      {
        method: "POST",
        headers: {
          "x-api-key": OPEN_CLOUD_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
   const responseText = await r.text();
console.log("Forwarded to Roblox:", r.status, responseText);
res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

   app.listen(process.env.PORT || 3000, () => console.log("Webhook bridge running on port", process.env.PORT || 3000));
