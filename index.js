const express = require("express");
const app = express();

app.get("/roll", (req, res) => {
  const user = req.query.user || "user";
  const max = parseInt(req.query.max) || 20;

  if (max < 2) {
    return res.send(`@${user} el dado debe ser mayor a 1`);
  }

  const roll = Math.floor(Math.random() * max) + 1;

  if (roll === 1) {
    return res.send(`@${user} sacó 1 💀 (pifia crítica)`);
  }

  if (roll === max) {
    return res.send(`@${user} sacó ${roll} 🔥 (CRÍTICO!)`);
  }

  return res.send(`@${user} sacó ${roll}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
