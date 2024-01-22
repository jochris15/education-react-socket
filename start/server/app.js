const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Bayi ambil tanganku")
})

app.listen(PORT, () => {
  console.log(`Aku cinta kamu ${PORT}`);
})