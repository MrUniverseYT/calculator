// generator.js
// Run with: node generator.js [days]
// Example: node generator.js 3

const fs = require("fs");
const path = require("path");

const DAYS_DEFAULT = 3;
const daysArg = parseInt(process.argv[2], 10);
const days = !isNaN(daysArg) && daysArg > 0 ? daysArg : DAYS_DEFAULT;

const codesPath = path.join(__dirname, "codes.json");

function loadCodes() {
  if (!fs.existsSync(codesPath)) return [];
  const txt = fs.readFileSync(codesPath, "utf8").trim();
  if (!txt) return [];
  return JSON.parse(txt);
}

function saveCodes(codes) {
  fs.writeFileSync(codesPath, JSON.stringify(codes, null, 2), "utf8");
}

function makeCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let c = "";
  for (let i = 0; i < 12; i++) {
    c += chars[Math.floor(Math.random() * chars.length)];
  }
  return c.match(/.{1,4}/g).join("-");
}

function main() {
  const codes = loadCodes();

  const code = makeCode();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  codes.push({
    code,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString()
  });

  saveCodes(codes);

  console.log("Generated code:", code);
  console.log("Expires at:", expiresAt.toISOString());
}

main();
