const express = require("express");
const app = express();

app.get("/roll", (req, res) => {
  const user = req.query.user || "user";
  let input = req.query.max || "20";

  // limpiar espacios
  input = input.replace(/\s+/g, '');

  // parsear formato: numero + opcional (+/-numero)
  const match = input.match(/^(\d+)([+-]\d+)?$/);

  if (!match) {
    return res.send(`@${user} usá: !d <caras>[+/-mod] (ej: !d 20+2)`);
  }

  const max = parseInt(match[1]);
  const mod = match[2] ? parseInt(match[2]) : 0;

  if (max < 2) {
    return res.send(`@${user} el dado debe ser mayor a 1`);
  }

  const roll = Math.floor(Math.random() * max) + 1;
  const total = roll + mod;

  // texto del cálculo
  const calc = mod !== 0 
    ? ` (${roll}${mod >= 0 ? '+' : ''}${mod}=${total})`
    : '';

  // críticos
  if (roll === 1) {
    return res.send(`@${user} tiró un d${max} y sacó 1 💀 (pifia crítica)${calc}`);
  }

  if (roll === max) {
    return res.send(`@${user} tiró un d${max} y sacó ${roll} 🔥 (CRÍTICO!)${calc}`);
  }

  return res.send(`@${user} tiró un d${max} y sacó ${total}${calc}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
