import express from "express";

const app = express();
const port = 3000;

app.get("/blocked-numbers", (_req, res) => {
  const phoneNumbers = [
    "380937451286",
    "380671245903",
    "380503612478",
    "380982354719",
    "380631829475",
    "380991256783",
    "380662498317",
    "380732685149",
    "380681357924",
    "380964832170",
  ];

  res.json(phoneNumbers);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
