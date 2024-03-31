const express = require("express");
const https = require("https");

const app = express();
const PORT = 8000;

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

    // Make a GET request to the carpark availability API
    https.get(BASE_URL, (responseFromAPI) => {
      let data = "";

      // A chunk of data has been received.
      responseFromAPI.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      responseFromAPI.on("end", () => {
        // Parse the received data as JSON
        const carparkAvailabilityData = JSON.parse(data);

        // Send the carpark availability data as the response
        res.json(carparkAvailabilityData);
      });
    });
  } catch (error) {
    // If there's an error, send an error response
    console.error("Error fetching carpark availability:", error);
    res.status(500).json({ error: "Error fetching carpark availability data" });
  }
});

app.get("/carpark-address", async (req, res) => {
  try {
    const BASE_URL =
      "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=3000&q=";
    https.get(BASE_URL, (responseFromAPI) => {
      let data = "";
      responseFromAPI.on("data", (chunk) => {
        data += chunk;
      });
      responseFromAPI.on("end", () => {
        const carparkAddressData = JSON.parse(data);
        res.json(carparkAddressData);
      });
    });
  } catch (error) {
    console.error("Error fetching carpark address:", error);
    res.status(500).json({ error: "Error fetching carpark address data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
