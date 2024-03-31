const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8000;

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});

// Handler for carpark availability endpoint
app.get("/carpark-availability", async (req, res) => {
  try {
    const BASE_URL =
      "https://api.data.gov.sg/v1/transport/carpark-availability";
    const response = await axios.get(BASE_URL);
    console.log(response);
    const data = response.data.items[0].carpark_data;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching carpark availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/carpark-address", async (req, res) => {
  try {
    const BASE_URL =
      "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=3000&q=";
    const response = await axios.get(BASE_URL);
    const data = response.data.result.records;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching carpark address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
